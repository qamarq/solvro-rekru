"use server"

import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const searchCocktail = async (query: string) => {
    const client = await pool.connect();
    const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-large"),
        value: query,
    });
    
    try {
        const { rows } = await client.query(
            `SELECT id, name, image, instruction, embedded_name::vector(3072) <=> '[${embedding}]'::vector(3072) AS distance FROM cocktails ORDER BY embedded_name::vector(3072) <=> '[${embedding}]'::vector(3072) LIMIT 10;`
        );
        return rows;
    } finally {
        client.release();
    }
}