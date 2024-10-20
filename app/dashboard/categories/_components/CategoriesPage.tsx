"use client"

import React from 'react';
import { Icons } from '@/components/icons'
import { LayoutTitle } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCategory, getCategories, upsertCategory } from '@/actions/category';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CategoryWithCocktails } from '@/lib/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function CategoriesPage({ categories }: { categories: CategoryWithCocktails[] }) {
    const [dialogOpened, setDialogOpened] = React.useState(false)
    const [editedName, setEditedName] = React.useState<string>("")
    const [currId, setCurrId] = React.useState<number | undefined>(undefined)
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await getCategories()
            return res.categories || []
        },
        initialData: categories,
        refetchOnMount: false,
    })

    const { mutate: upsertCategoryFn, isPending: isPendingUpsert } = useMutation({
        mutationFn: upsertCategory,
        onSuccess: (response) => {
            refetch()
            setEditedName("")
            setCurrId(undefined)
            setDialogOpened(false)
            if (!response?.data?.success) return toast.error(response?.data?.failure || "Wystąpił błąd podczas aktualizacji kategorii")
            toast.success("Kategoria została zaktualizowana")
        },
        onError: () => {
            toast.error("Wystąpił błąd podczas aktualizacji kategorii")
        }
    })

    const { mutate: deleteCategoryFn, isPending: isPendingDelete } = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            refetch()
            toast.success("Kategoria została usunięta")
        },
        onError: () => {
            toast.error("Wystąpił błąd podczas usuwania kategorii")
        }
    })

    const handleUpsertCategory = () => upsertCategoryFn({ id: currId, name: editedName })

    const handleDeleteCategory = (id: number) => deleteCategoryFn({ id })

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-6'>
                <LayoutTitle className='mb-0'>Kategorie koktajli</LayoutTitle>
                <Button variant={"secondary"} onClick={() => {
                    setDialogOpened(true)
                    setEditedName("")
                    setCurrId(undefined)
                }}>
                    <Icons.Plus className='w-4 h-4 mr-2' />Dodaj kategorię
                </Button>
            </div>

            <div>
                <Table>
                    <TableHeader>
                        <TableRow className='bg-muted/30'>
                            <TableHead className="w-[60px]">ID</TableHead>
                            <TableHead>Nazwa</TableHead>
                            <TableHead className="text-right">Akcja</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3} className='text-center'>Ładowanie...</TableCell>
                            </TableRow>
                        )}
                        {data.map((cocktail) => (
                            <TableRow key={cocktail.id}>
                                <TableCell className="font-medium">
                                    {cocktail.id}
                                </TableCell>
                                <TableCell className=''>
                                    <h1 className='font-cal translate-y-[1px] text-lg'>{cocktail.name}</h1>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant={"secondary"} size={"icon"} onClick={() => {
                                        setDialogOpened(true)
                                        setEditedName(cocktail.name)
                                        setCurrId(cocktail.id)
                                    }}>
                                        <Icons.Edit className='w-4 h-4' />
                                    </Button>
                                    <Button onClick={() => handleDeleteCategory(cocktail.id)} variant={"destructive"} size={"icon"} disabled={isPendingDelete}>
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
                        <DialogTitle>Edytuj kategorię</DialogTitle>
                        <DialogDescription>Możesz edytować nazwę tej kategorii</DialogDescription>
                    </DialogHeader>
                    
                    <div className='grid gap-4'>
                        <Input placeholder='Nazwa kategorii' value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                    </div>

                    <DialogFooter>
                        <Button onClick={handleUpsertCategory} disabled={isPendingUpsert}>
                            {isPendingUpsert && <Icons.Loading />}
                            Zapisz
                        </Button> 
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
