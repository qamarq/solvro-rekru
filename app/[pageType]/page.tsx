import { notFound } from 'next/navigation'
import React from 'react'
import CocktailsPage from './_components/CocktailsPage'

export default function AllCocktailsOrFav({ params }: { params: { pageType: string } }) {
    if (params.pageType === 'cocktails') {
        return <CocktailsPage />
    } else if (params.pageType === 'favorites') {
        return <CocktailsPage favorite />
    } else {
        return notFound()
    }
}
