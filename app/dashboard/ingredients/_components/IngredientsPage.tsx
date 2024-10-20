"use client"

import React from 'react';
import { Icons } from '@/components/icons'
import { LayoutTitle } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Ingredient } from '@prisma/client';
import { deleteIngredient, getIngredients, upsertIngredient } from '@/actions/ingredients';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function IngredientsPage({ ingredients }: { ingredients: Ingredient[] }) {
    const [dialogOpened, setDialogOpened] = React.useState(false)
    const [editedName, setEditedName] = React.useState<string>("")
    const [currId, setCurrId] = React.useState<number | undefined>(undefined)
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['ingredients'],
        queryFn: async () => {
            const res = await getIngredients()
            return res.ingredients || []
        },
        initialData: ingredients,
        refetchOnMount: false,
    })

    const { mutate: upsertIngredientFn, isPending: isPendingUpsert } = useMutation({
        mutationFn: upsertIngredient,
        onSuccess: (response) => {
            refetch()
            setEditedName("")
            setCurrId(undefined)
            setDialogOpened(false)
            if (!response?.data?.success) return toast.error(response?.data?.failure || "Wystąpił błąd podczas aktualizacji tagu")
            toast.success("Tag została zaktualizowany")
        },
        onError: () => {
            toast.error("Wystąpił błąd podczas aktualizacji tagu")
        }
    })

    const { mutate: deleteIngredientFn, isPending: isPendingDelete } = useMutation({
        mutationFn: deleteIngredient,
        onSuccess: () => {
            refetch()
            toast.success("Tag został usunięty")
        },
        onError: () => {
            toast.error("Wystąpił błąd podczas usuwania tagu")
        }
    })

    const handleUpsertIngredient = () => {
        // upsertIngredientFn({ id: currId, name: editedName })
    }

    const handleDeleteIngredient = (id: number) => deleteIngredientFn({ id })

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-6'>
                <LayoutTitle className='mb-0'>Składniki</LayoutTitle>
                <Button variant={"secondary"} onClick={() => {
                    setDialogOpened(true)
                    setEditedName("")
                    setCurrId(undefined)
                }}>
                    <Icons.Plus className='w-4 h-4 mr-2' />Dodaj składnik
                </Button>
            </div>

            <div>
                <Table>
                    <TableHeader>
                        <TableRow className='bg-muted/30'>
                            <TableHead className="w-[60px]">ID</TableHead>
                            <TableHead>Nazwa</TableHead>
                            <TableHead>Opis</TableHead>
                            <TableHead>Czy alkohol</TableHead>
                            <TableHead>Typ</TableHead>
                            <TableHead className="text-right">Akcja</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3} className='text-center'>Ładowanie...</TableCell>
                            </TableRow>
                        )}
                        {data.map((ingredient) => (
                            <TableRow key={ingredient.id}>
                                <TableCell className="font-medium">
                                    {ingredient.id}
                                </TableCell>
                                <TableCell className=''>
                                    <div className='flex items-center gap-2'>
                                        <Image src={ingredient.image} alt={ingredient.name} width={214} height={214} className='rounded-md w-[40px] h-[40px]' unoptimized />
                                        <h1 className='font-cal translate-y-[1px] text-lg'>{ingredient.name}</h1>
                                    </div>
                                </TableCell>
                                <TableCell><span className='block truncate max-w-[200px]'>{ingredient.description}</span></TableCell>
                                <TableCell><Badge variant={ingredient.isAlcohol ? "destructive" : "default"}>{ingredient.isAlcohol ? 'Tak' : 'Nie'}</Badge></TableCell>
                                <TableCell>{ingredient.type}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant={"secondary"} size={"icon"} onClick={() => {
                                        setDialogOpened(true)
                                        setEditedName(ingredient.name)
                                        setCurrId(ingredient.id)
                                    }}>
                                        <Icons.Edit className='w-4 h-4' />
                                    </Button>
                                    <Button onClick={() => handleDeleteIngredient(ingredient.id)} variant={"destructive"} size={"icon"} disabled={isPendingDelete}>
                                        {isPendingDelete ? <Icons.Loading /> : <Icons.Trash className='w-4 h-4' />}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edytuj tag</DialogTitle>
                        <DialogDescription>Możesz edytować nazwę tego tagu</DialogDescription>
                    </DialogHeader>
                    
                    <div className='grid gap-4'>
                        <Input placeholder='Nazwa tagu' value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                    </div>

                    <DialogFooter>
                        <Button onClick={handleUpsertIngredient} disabled={isPendingUpsert}>
                            {isPendingUpsert && <Icons.Loading />}
                            Zapisz
                        </Button> 
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
