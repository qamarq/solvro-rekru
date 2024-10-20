import { getTags } from '@/actions/tags'
import React from 'react'
import TagsPage from './_components/TagsPage'

export default async function DashboardTags() {
    const { tags } = await getTags()

    return <TagsPage tags={tags || []} />
}
