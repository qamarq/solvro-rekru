import React from 'react'
import CocktailsPage from '../_components/CocktailsPage'
import { getCocktails } from '@/actions/cocktails'

export default async function FavoritesPage() {
    const cocktailCount = await getCocktails({ onlyCount: true, favorite: true })
    return <CocktailsPage favorite count={cocktailCount?.data?.count || 3} />
}
