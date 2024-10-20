"use client"

import React, { useTransition } from 'react'
import { Icons } from './icons'
import { Button } from './ui/button'
import Link from 'next/link'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'

export default function AppTopbar() {
    const segment = useSelectedLayoutSegment()
    const [search, setSearch] = React.useState("")
    const [isSearching, startTransition] = useTransition();
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (search.length > 0) {
            startTransition(() => {
                router.push(`/search?query=${search}`);
            });
        }
    }

    return (
        <nav className='fixed top-0 inset-x-0 z-50 p-3'>
            <div className='container mx-auto backdrop-blur-[12px] px-6 py-4 grid grid-cols-2 border rounded-lg'>
                <div className='flex items-center gap-5'>
                    <Link href='/' className='flex items-center gap-2'>
                        <Icons.Logo className='w-10 h-auto' />
                        <h1 className='font-cal translate-y-[1px] text-2xl'>Cocktails</h1>
                    </Link>

                    <div className='flex items-center'>
                        <Link href='/cocktails'><Button variant={"ghost"} className={segment === "cocktails" ? "text-foreground" : "text-muted-foreground"}>Wszystkie koktajle</Button></Link>
                        <Link href='/favorites'><Button variant={"ghost"} className={segment === "favorites" ? "text-foreground" : "text-muted-foreground"}>Ulubione</Button></Link>
                        <Link href='/search'><Button variant={"ghost"} className={segment === "search" ? "text-foreground" : "text-muted-foreground"}>Wyszukiwanie</Button></Link>
                    </div>
                </div>
                <div className='flex items-center justify-end gap-2'>
                    <form className='bg-foreground/5 p-2.5 px-3 rounded-md w-full max-w-[300px] flex items-center' onSubmit={handleSubmit}>
                        <button>{isSearching ? <Icons.Loading /> : <Icons.Search className='w-4 h-4 mr-2' />}</button>
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='bg-transparent w-full focus:outline-none text-sm' placeholder='Wyszukaj koktajl' />
                    </form>
                    <Link href="/dashboard">
                        <Button className='btn btn-primary'><Icons.Settings className="w-4 h-4 mr-2" />Zarządzaj koktajlami</Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
