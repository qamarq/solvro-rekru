import React from 'react'
import CategoriesPage from './_components/CategoriesPage'
import { getCategories } from '@/actions/category'

export default async function DashboardCategories() {
    const categories = await getCategories()

    return <CategoriesPage categories={categories.categories || []} />
}
