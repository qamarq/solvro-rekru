'use server';

import { prisma } from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { embed } from 'ai';
import { openai } from "@ai-sdk/openai";

const addCocktailSchema = z.object({
    name: z.string(),
    instruction: z.string(),
    ingredients: z.array(
        z.object({
            ingredientId: z.number(),
            quantity: z.number(),
            measure: z.string(),
        })
    ),
    tags: z.array(z.number()),
    image: z.string(),
    categoryId: z.number(),
});

export const addCocktail = actionClient
    .schema(addCocktailSchema)
    .action(async ({ parsedInput }) => {
        //! Dodajemy auth jeśli posiadamy system konta ponieważ akcja jest stricte dla administratora a server action w nextjs jest pod random id ale publiczne
        try {
            const { embedding } = await embed({
                model: openai.embedding("text-embedding-3-large"),
                value: parsedInput.name,
            });

            const cocktail = await prisma.cocktail.create({
                data: {
                    name: parsedInput.name,
                    embedded_name: embedding,
                    instruction: parsedInput.instruction,
                    ingredients: {
                        create: parsedInput.ingredients.map((ingredient) => ({
                            quantity: ingredient.quantity,
                            ingredient: {
                                connect: {
                                    id: ingredient.ingredientId,
                                },
                            },
                            measure: ingredient.measure,
                        })),
                    },
                    tags: {
                        connect: parsedInput.tags.map((tagId) => ({
                            id: tagId,
                        })),
                    },
                    image: parsedInput.image,
                    category: {
                        connect: {
                            id: parsedInput.categoryId,
                        },
                    },
                    favorite: false,
                },
            });

            revalidatePath('/cocktails');
            revalidatePath('/dashboard');
            return { success: true, cocktail };
        } catch (error) {
            console.log(error);
            return {
                failure: true,
                error: 'Wystąpił błąd podczas dodawania koktajlu',
            };
        }
    });

const updateCocktailSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
    instruction: z.string().optional(),
    ingredients: z
        .array(
            z.object({
                ingredientId: z.number(),
                quantity: z.number(),
                measure: z.string(),
            })
        )
        .optional(),
    tags: z.array(z.number()).optional(),
    image: z.string().optional(),
    categoryId: z.number().optional(),
    favorite: z.boolean().optional(),
});

export const updateCocktail = actionClient
    .schema(updateCocktailSchema)
    .action(async ({ parsedInput }) => {
        try {
            const { embedding } = await embed({
                model: openai.embedding("text-embedding-3-large"),
                value: parsedInput.name,
            });

            // Filtrowanie, aby usunąć pola z wartością undefined
            const updateData = {
                ...(parsedInput.name && { name: parsedInput.name }),
                ...(parsedInput.name && { embedded_name: embedding }),
                ...(parsedInput.instruction && {
                    instruction: parsedInput.instruction,
                }),
                ...(parsedInput.ingredients && {
                    ingredients: {
                        upsert: parsedInput.ingredients.map((ingredient) => ({
                            where: {
                                cocktailId_ingredientId: {
                                    ingredientId: ingredient.ingredientId,
                                    cocktailId: parsedInput.id,
                                },
                            },
                            update: {
                                quantity: ingredient.quantity,
                                measure: ingredient.measure,
                            },
                            create: {
                                quantity: ingredient.quantity,
                                ingredient: {
                                    connect: {
                                        id: ingredient.ingredientId,
                                    },
                                },
                                measure: ingredient.measure,
                            },
                        })),
                    },
                }),
                ...(parsedInput.tags && {
                    tags: {
                        set: parsedInput.tags.map((tagId) => ({
                            id: tagId,
                        })),
                    },
                }),
                ...(parsedInput.image && { image: parsedInput.image }),
                ...(parsedInput.categoryId && {
                    category: {
                        connect: { id: parsedInput.categoryId },
                    },
                }),
                ...(parsedInput.favorite !== undefined && {
                    favorite: parsedInput.favorite,
                }),
            };

            const cocktail = await prisma.cocktail.update({
                where: { id: parsedInput.id },
                data: updateData,
            });

            revalidatePath('/cocktails');
            revalidatePath('/dashboard');

            return { success: true, cocktail };
        } catch (error) {
            console.log(error);
            return {
                failure: true,
                error: 'Wystąpił błąd podczas aktualizacji koktajlu',
            };
        }
    });

const deleteCocktailSchema = z.object({
    id: z.number(),
});

export const deleteCocktail = actionClient
    .schema(deleteCocktailSchema)
    .action(async ({ parsedInput }) => {
        //! Dodajemy auth jeśli posiadamy system konta ponieważ akcja jest stricte dla administratora a server action w nextjs jest pod random id ale publiczne
        try {
            await prisma.ingredientOnCocktail.deleteMany({
                where: { cocktailId: parsedInput.id }, // Zakładając, że parsedInput zawiera id koktajlu
            });

            // Następnie usuń koktajl
            const cocktail = await prisma.cocktail.delete({
                where: parsedInput,
            });

            revalidatePath('/cocktails');
            revalidatePath('/dashboard');
            
            return { success: true, cocktail };
        } catch (error) {
            console.log(error);
            return {
                failure: true,
                error: 'Wystąpił błąd podczas usuwania koktajlu',
            };
        }
    });

const getCocktailsSchema = z.object({
    favorite: z.boolean().optional(),
});

export const getCocktails = actionClient
    .schema(getCocktailsSchema)
    .action(async ({ parsedInput }) => {
        try {
            const cocktails = await prisma.cocktail.findMany({
                where:
                    parsedInput.favorite !== undefined
                        ? { favorite: parsedInput.favorite }
                        : {},
                include: {
                    ingredients: {
                        include: {
                            ingredient: true,
                        },
                    },
                    tags: true,
                    category: true,
                },
                orderBy: { id: "asc" }
            });

            return { success: true, cocktails };
        } catch (error) {
            console.log(error);
            return {
                failure: true,
                error: 'Wystąpił błąd podczas pobierania koktajli',
            };
        }
    });



const getCocktailSchema = z.object({
    id: z.number(),
});

export const getCocktail = actionClient
    .schema(getCocktailSchema)
    .action(async ({ parsedInput }) => {
        try {
            const cocktail = await prisma.cocktail.findUnique({
                where: { id: parsedInput.id },
                include: {
                    ingredients: {
                        include: {
                            ingredient: true,
                        },
                    },
                    tags: true,
                    category: true,
                },
            });

            return { success: true, cocktail };
        } catch (error) {
            console.log(error);
            return {
                failure: true,
                error: 'Wystąpił błąd podczas pobierania koktajlu',
            };
        }
    });