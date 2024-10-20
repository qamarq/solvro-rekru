"use server"

import { prisma } from "@/lib/db"
import { actionClient } from "@/lib/safe-action"
import { z } from "zod"


const upsertTagSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
})

export const upsertTag = actionClient
    .schema(upsertTagSchema)
    .action(async ({ parsedInput }) => {
        //! Dodajemy auth jeśli posiadamy system konta ponieważ akcja jest stricte dla administratora a server action w nextjs jest pod random id ale publiczne
        try {
            if (parsedInput.id) {
                const tag = await prisma.tag.update({
                    where: {
                        id: parsedInput.id,
                    },
                    data: {
                        name: parsedInput.name,
                    },
                })

                return { success: true, tag }
            } else {
                const tag = await prisma.tag.create({
                    data: parsedInput,
                })

                return { success: true, tag }
            }
        } catch (error) {
            console.log(error)
            return { failure: true, error: "Wystąpił błąd podczas aktualizacji tagu" }
        }
    })



const deleteTagSchema = z.object({
    id: z.number(),
})

export const deleteTag = actionClient
    .schema(deleteTagSchema)
    .action(async ({ parsedInput }) => {
        //! Dodajemy auth jeśli posiadamy system konta ponieważ akcja jest stricte dla administratora a server action w nextjs jest pod random id ale publiczne
        try {
            const tag = await prisma.tag.delete({
                where: parsedInput,
            })
    
            return { success: true, tag }
        } catch (error) {
            console.log(error)
            return { failure: true, error: "Wystąpił błąd podczas usuwania tagu" }
        }
    })



export const getTags = async () => {
    try {
        const tags = await prisma.tag.findMany()

        return { success: true, tags }
    } catch (error) {
        console.log(error)
        return { failure: true, error: "Wystąpił błąd podczas pobierania tagów" }
    }
}