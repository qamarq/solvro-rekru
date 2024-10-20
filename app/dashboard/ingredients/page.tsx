import React from 'react'
import IngredientsPage from './_components/IngredientsPage'
import { getIngredients } from '@/actions/ingredients'

export default async function DashboardIngredients() {
    const { ingredients } = await getIngredients()

    return <IngredientsPage ingredients={ingredients || []} />
}
