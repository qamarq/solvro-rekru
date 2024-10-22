"use client"

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'

export default function DashboardSidebar() {
    const segment = useSelectedLayoutSegment()
    const [hiddenMenu, setHiddenMenu] = React.useState(false)

    const MENU = [
        { label: 'Koktajle', icon: Icons.Drink, segment: null, href: '/dashboard' },
        { label: 'Kategorie', icon: Icons.GridCheck, segment: 'categories', href: '/dashboard/categories' },
        { label: 'Składniki', icon: Icons.FlaskRound, segment: 'ingredients', href: '/dashboard/ingredients' },
        { label: 'Tagi', icon: Icons.Tags, segment: 'tags', href: '/dashboard/tags' },
    ]

    return (
        <div className='min-w-[280px] p-2'>
            <div className='bg-foreground/10 rounded-sm p-2.5 flex items-center gap-2 justify-between'>
                <div className='flex items-center gap-2'>
                    <div className='bg-primary w-[40px] h-[40px] flex items-center justify-center rounded-[5px]'><Icons.Logo mono className="w-3/4" /></div>
                    <div>
                        <h1 className='text-lg font-cal translate-y-[1px] leading-none'>Solvro</h1>
                        <h3 className='text-xs text-muted-foreground leading-none'>Enterprise</h3>
                    </div>
                </div>

                <Button variant={"ghost"} size={"icon"} onClick={() => setHiddenMenu(prev => !prev)}><Icons.ChevronsUpDown className="w-4 h-4" /></Button>
            </div>

            {!hiddenMenu && <div className='mt-5 flex flex-col gap-2'>
                <p className='text-xs text-muted-foreground font-semibold mb-3'>Wybierz z menu</p>
                {MENU.map((item, index) => (
                    <Link key={`button-menu-${index}`} href={item.href} className='w-full'>
                        <Button variant={segment === item.segment ? "outline" : "ghost"} size={"sm"} className='justify-start w-full'>
                            <item.icon className='w-4 h-4 mr-2' />
                            {item.label}
                            <div className='grow flex items-center justify-end'>{segment === item.segment ? <div className='w-2 h-2 bg-primary rounded-full -translate-x-1' /> : <Icons.Right className='w-4 h-4' />}</div>
                        </Button>
                    </Link>
                ))}
            </div>}
        </div>
    )
}
