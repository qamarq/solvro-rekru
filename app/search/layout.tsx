import LayoutContainer from '@/components/layout'
import React, { Suspense } from 'react'
import SearchBar from './_components/SearchBar'

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutContainer>
            <div className='w-full flex items-center justify-center flex-col'>
                <h1 className='text-5xl font-cal mt-10 text-center'>Znajdź to, czego szukasz</h1>
                <h3 className='mt-2 text-muted-foreground text-lg max-w-[700px] text-center text-balance'>Skorzystaj z wektorowego wyszukiwania, aby uzyskać jak najbardziej precyzyjne wyniki z bazy danych!</h3>

                <div className='mt-10 max-w-2xl mx-auto w-full'>
                    <Suspense fallback={<div>Ładowanie...</div>}><SearchBar /></Suspense>
                    {children}
                </div>
            </div>
        </LayoutContainer>
    )
}
