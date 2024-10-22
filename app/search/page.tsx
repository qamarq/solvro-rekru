import { searchCocktail } from '@/actions/pg'
import { Cocktail } from '@prisma/client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { roundToNdecimals } from '@/lib/utils'

export default async function SearchPage(
    props: { searchParams: Promise<{
        [key: string]: string | string[] | undefined
    }>}
) {
    const searchParams = await props.searchParams;
    const query = searchParams.query
    if (Array.isArray(query) || !query) {
        return
    }

    type CocktailWithDistance = Cocktail & { distance: number }
    const results = await searchCocktail(query) as CocktailWithDistance[]

    return (
        <div>
            <p className='text-muted-foreground text-sm mt-2'>Wyniki wyszukiwania dla &quot;{query}&quot;</p>
            
            <div className='flex flex-col gap-2 mt-5'>
                {results.map((result, idx) => (
                    <Link key={result.id} href={'/cocktails/'+result.id} className='relative'>
                        <div className='flex items-center gap-2 border p-4 rounded-md bg-muted/20'>
                            <Image src={result.image} alt='' width={100} height={100} className='w-[60px] aspect-square object-contain rounded-md' unoptimized />
                            <div>
                                <h1 className='font-cal text-lg'>{result.name}</h1>
                                <p className='text-muted-foreground text-sm line-clamp-1'>{result.instruction}</p>
                            </div>
                        </div>

                        <Badge variant={idx === 0 ? "default" : "outline"} className='absolute top-3 right-3'>{idx === 0 ? "Best match" : "Odległość"}: {roundToNdecimals(result.distance, 3)}</Badge>
                    </Link>
                ))}
                {results.length === 0 && NotFound()}
            </div>
        </div>
    )
}

const NotFound = () => {
    return (
        <div className='w-full text-center mt-10'>Brak wyników wyszukiwania lub podana fraza nie została znaleziona</div>
    )
}