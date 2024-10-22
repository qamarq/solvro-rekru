import React from 'react'
import CocktailsPage from '../_components/CocktailsPage'
import { getCocktails } from '@/actions/cocktails'

export default async function CocktailsMainPage() {
    const cocktailCount = await getCocktails({ onlyCount: true })
    return <CocktailsPage count={cocktailCount?.data?.count || 3} />
}
