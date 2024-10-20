import { cn } from '@/lib/utils'
import React from 'react'

export default function LayoutContainer({ children, className }: Readonly<{ children: React.ReactNode, className?: string }>) {
    return (
        <div className={cn("pt-28 container mx-auto", className)}>{children}</div>
    )
}

export function LayoutTitle({ children, className }: Readonly<{ children: React.ReactNode, className?: string }>) {
    return <h1 className={cn("font-cal translate-y-[1px] text-3xl mb-6", className)}>{children}</h1>
}