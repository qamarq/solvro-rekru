"use client"

import React, { useTransition } from 'react'
import { Icons } from './icons'
import { Button } from './ui/button'
import Link from 'next/link'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import { Drawer, DrawerContent } from './ui/drawer'
import { DialogFooter, DialogHeader } from './ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'

const SubMenu = [
    {
        title: "Wszystkie koktajle",
        href: "/cocktails"
    },
    {
        title: "Ulubione",
        href: "/favorites"
    },
    {
        title: "Wyszukiwanie",
        href: "/search"
    }
]

export default function AppTopbar() {
    const segment = useSelectedLayoutSegment()
    const [search, setSearch] = React.useState("")
    const [isSearching, startTransition] = useTransition();
    const router = useRouter()
    const [opened, setOpened] = React.useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (search.length > 0) {
            startTransition(() => {
                router.push(`/search?query=${search}`);
            });
        }
    }

    const handleCloseDrawer = () => setOpened(false)

    return (
        <nav className='fixed top-0 inset-x-0 z-50 p-3'>
            <div className='container mx-auto backdrop-blur-[12px] px-6 py-4 grid grid-cols-2 border rounded-lg'>
                <div className='flex items-center gap-5'>
                    <Link href='/' className='flex items-center gap-2'>
                        <Icons.Logo className='w-10 h-auto' />
                        <h1 className='font-cal translate-y-[1px] text-2xl'>Cocktails</h1>
                    </Link>

                    <div className='items-center hidden md:flex'>
                        {SubMenu.map((item, index) => (
                            <Link key={index} href={item.href}><Button variant={"ghost"} className={segment === item.href.slice(1) ? "text-foreground" : "text-muted-foreground"}>{item.title}</Button></Link>
                        ))}
                    </div>
                </div>
                <div className='hidden md:flex items-center justify-end gap-2'>
                    <form className='bg-foreground/5 p-2.5 px-3 rounded-md w-full max-w-[300px] flex items-center' onSubmit={handleSubmit}>
                        <button>{isSearching ? <Icons.Loading /> : <Icons.Search className='w-4 h-4 mr-2' />}</button>
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='bg-transparent w-full focus:outline-none text-sm' placeholder='Wyszukaj koktajl' />
                    </form>
                    <Link href="/dashboard">
                        <Button><Icons.Settings className="w-4 h-4 mr-2" />Zarządzaj koktajlami</Button>
                    </Link>
                </div>
                <div className='flex md:hidden items-center justify-end'><Button onClick={() => setOpened(prev => !prev)} size={"icon"} variant={"secondary"}><Icons.Menu className='w-4 h-4' /></Button></div>
                <Drawer open={opened} onOpenChange={setOpened}>
                    <DrawerContent>
                        <DialogHeader>
                            <DialogTitle className='mt-5 font-cal text-2xl'>Cocktails Solvro</DialogTitle>
                        </DialogHeader>
                        <div className="p-4 pb-0 flex flex-col gap-2">
                            {SubMenu.map((item, index) => (
                                <Link key={index} href={item.href} className='w-full' onClick={handleCloseDrawer}>
                                    <Button 
                                        variant={segment === item.href.slice(1) ? "secondary" : "outline"} 
                                        className={segment === item.href.slice(1) ? "text-foreground w-full" : "text-muted-foreground w-full"}
                                    >
                                        {item.title}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                        <DialogFooter className='p-4 py-10'>
                            <Link href="/dashboard" onClick={handleCloseDrawer}>
                                <Button className='w-full'><Icons.Settings className="w-4 h-4 mr-2" />Zarządzaj koktajlami</Button>
                            </Link>
                        </DialogFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </nav>
    )
}
