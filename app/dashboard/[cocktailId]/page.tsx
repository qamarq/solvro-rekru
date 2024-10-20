import LayoutContainer from '@/components/layout'
import React from 'react'
import CocktailAddEditPage from '../_components/CocktailAddEditPage'
import { getCocktail } from '@/actions/cocktails'
import { getIngredients } from '@/actions/ingredients'
import { getTags } from '@/actions/tags'
import { getCategories } from '@/actions/category'

export default async function CocktailEditPage({ params }: { params: { cocktailId?: string } }) {
    const cocktail = await getCocktail({ id: params.cocktailId ? +params.cocktailId : 0 })
    const { ingredients } = await getIngredients()
    const { tags } = await getTags()
    const { categories } = await getCategories()

    return (
        <LayoutContainer className='pt-0'>
            <CocktailAddEditPage 
                cocktail={cocktail?.data?.cocktail}
                ingredients={ingredients} 
                tags={tags}
                categories={categories}
            />
        </LayoutContainer>
    )
}
