"use server"

import { prisma } from "@/lib/db"
import { actionClient } from "@/lib/safe-action"
import { z } from "zod"

const upsertCategorySchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
})

export const upsertCategory = actionClient
    .schema(upsertCategorySchema)
    .action(async ({ parsedInput }) => {
        try {
            const category = parsedInput.id
                ? await prisma.category.update({
                    where: {
                        id: parsedInput.id,
                    },
                    data: {
                        name: parsedInput.name,
                    },
                })
                : await prisma.category.create({
                    data: parsedInput,
                })

            return { success: true, category }
        } catch (error) {
            console.log(error)
            return { failure: "Wystąpił błąd podczas dodawania/aktualizacji kategorii" }
        }
    })


const deleteCategorySchema = z.object({
    id: z.number(),
})

export const deleteCategory = actionClient
    .schema(deleteCategorySchema)
    .action(async ({ parsedInput }) => {
        //! Dodajemy auth jeśli posiadamy system konta ponieważ akcja jest stricte dla administratora a server action w nextjs jest pod random id ale publiczne
        try {
            const category = await prisma.category.delete({
                where: parsedInput,
            })
    
            return { success: true, category }  
        } catch (error) {
            console.log(error)
            return { failure: true, error: "Wystąpił błąd podczas usuwania kategorii" }
        }
    })



export const getCategories = async () => {
    try {
        const categories = await prisma.category.findMany({ include: { Cocktail: true } })

        return { success: true, categories }
    } catch (error) {
        console.log(error)
        return { failure: true, error: "Wystąpił błąd podczas pobierania kategorii" }
    }
}