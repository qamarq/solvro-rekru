import { Prisma } from '@prisma/client';

export type getCocktailType = Prisma.CocktailGetPayload<{
    include: {
        ingredients: {
            include: {
                ingredient: true;
            };
        };
        tags: true;
        category: true;
    };
}>;

export type CategoryWithCocktails = Prisma.CategoryGetPayload<{
    include: {
        Cocktail: true;
    };
}>;