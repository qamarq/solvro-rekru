import { getCocktails } from '@/actions/cocktails';
import { LayoutTitle } from '@/components/layout';
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import TableRowWithLink from './_components/TableRowWithLink';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icons } from '@/components/icons';

export default async function DashboardPage() {
    const cocktails = await getCocktails({});

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-6'>
                <LayoutTitle className='mb-0'>Dashboard</LayoutTitle>
                <Link href="/dashboard/add">
                    <Button variant={"secondary"}><Icons.Plus className='w-4 h-4 mr-2' />Dodaj koktajl</Button>
                </Link>
            </div>

            <div>
                <Table>
                    <TableHeader>
                        <TableRow className='bg-muted/30'>
                            <TableHead className="w-[60px]">ID</TableHead>
                            <TableHead>Nazwa</TableHead>
                            <TableHead>Ilość składników</TableHead>
                            <TableHead>Instrukcja przygotowania</TableHead>
                            <TableHead>Ulubione</TableHead>
                            <TableHead className="text-right">Kategoria</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cocktails?.data?.cocktails?.map((cocktail) => (
                            <TableRowWithLink key={cocktail.id} cocktailId={cocktail.id}>
                                <TableCell className="font-medium">
                                    {cocktail.id}
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-2'>
                                        <Image src={cocktail.image} alt='' width={200} height={200} className='w-[40px] aspect-square object-contain' unoptimized />
                                        <h1 className='font-cal translate-y-[3px] text-lg'>{cocktail.name}</h1>
                                    </div>
                                </TableCell>
                                <TableCell><Badge variant={"secondary"}>Składniki: {cocktail.ingredients.length}</Badge></TableCell>
                                <TableCell><span className='block truncate max-w-[200px]'>{cocktail.instruction}</span></TableCell>
                                <TableCell><Badge variant={"destructive"}>{cocktail.favorite ? "Tak" : "Nie"}</Badge></TableCell>
                                <TableCell className="text-right">
                                    {cocktail.category?.name}
                                </TableCell>
                            </TableRowWithLink>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
