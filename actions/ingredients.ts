"use server"

import { prisma } from "@/lib/db"
import { actionClient } from "@/lib/safe-action"
import { upsertIngredientSchema } from "@/schemas"
import { z } from "zod"

export const upsertIngredient = actionClient
    .schema(upsertIngredientSchema)
    .action(async ({ parsedInput }) => {
        //! Dodajemy auth jeśli posiadamy system konta ponieważ akcja jest stricte dla administratora a server action w nextjs jest pod random id ale publiczne
        try {
            if (parsedInput.id) {
                const ingredient = await prisma.ingredient.update({
                    where: {
                        id: parsedInput.id,
                    },
                    data: parsedInput,
                })

                return { success: true, ingredient }
            } else {
                const ingredient = await prisma.ingredient.create({
                    data: parsedInput,
                })

                return { success: true, ingredient }
            }
        } catch (error) {
            console.log(error)
            return { failure: true, error: "Wystąpił błąd podczas aktualizacji składnika" }
        }
    })


const deleteIngredientSchema = z.object({
    id: z.number(),
})

export const deleteIngredient = actionClient
    .schema(deleteIngredientSchema)
    .action(async ({ parsedInput }) => {
        //! Dodajemy auth jeśli posiadamy system konta ponieważ akcja jest stricte dla administratora a server action w nextjs jest pod random id ale publiczne
        try {
            const ingredient = await prisma.ingredient.delete({
                where: parsedInput,
            })
    
            return { success: true, ingredient }
        } catch (error) {
            console.log(error)
            return { failure: true, error: "Wystąpił błąd podczas usuwania składnika" }
        }
    })
    


export const getIngredients = async () => {
    try {
        const ingredients = await prisma.ingredient.findMany({ orderBy: { id: 'asc' } })

        return { success: true, ingredients }
    } catch (error) {
        console.log(error)
        return { failure: true, error: "Wystąpił błąd podczas pobierania składników" }
    }
}