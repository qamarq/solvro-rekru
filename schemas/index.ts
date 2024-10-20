import { z } from "zod";

export const upsertIngredientSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    description: z.string(),
    isAlcohol: z.boolean(),
    image: z.string(),
    type: z.string(),
})