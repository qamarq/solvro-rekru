"use client"

import { TableRow } from '@/components/ui/table'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function TableRowWithLink({ children, cocktailId }: Readonly<{ children: React.ReactNode, cocktailId: number }>) {
    const router = useRouter()

    return (
        <TableRow className='cursor-pointer' onClick={() => router.push("/dashboard/"+cocktailId)}>{children}</TableRow>
    )
}
