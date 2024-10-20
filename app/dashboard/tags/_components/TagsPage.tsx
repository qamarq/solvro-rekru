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
import { Tag } from '@prisma/client';
import { deleteTag, getTags, upsertTag } from '@/actions/tags';

export default function IngredientsPage({ tags }: { tags: Tag[] }) {
    const [dialogOpened, setDialogOpened] = React.useState(false)
    const [editedName, setEditedName] = React.useState<string>("")
    const [currId, setCurrId] = React.useState<number | undefined>(undefined)
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await getTags()
            return res.tags || []
        },
        initialData: tags,
        refetchOnMount: false,
    })

    const { mutate: upsertTagFn, isPending: isPendingUpsert } = useMutation({
        mutationFn: upsertTag,
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

    const { mutate: deleteTagFn, isPending: isPendingDelete } = useMutation({
        mutationFn: deleteTag,
        onSuccess: () => {
            refetch()
            toast.success("Tag został usunięty")
        },
        onError: () => {
            toast.error("Wystąpił błąd podczas usuwania tagu")
        }
    })

    const handleUpsertTag = () => upsertTagFn({ id: currId, name: editedName })

    const handleDeleteTag = (id: number) => deleteTagFn({ id })

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between mb-6'>
                <LayoutTitle className='mb-0'>Tagi</LayoutTitle>
                <Button variant={"secondary"} onClick={() => {
                    setDialogOpened(true)
                    setEditedName("")
                    setCurrId(undefined)
                }}>
                    <Icons.Plus className='w-4 h-4 mr-2' />Dodaj tag
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
                                    <Button onClick={() => handleDeleteTag(cocktail.id)} variant={"destructive"} size={"icon"} disabled={isPendingDelete}>
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
                        <Button onClick={handleUpsertTag} disabled={isPendingUpsert}>
                            {isPendingUpsert && <Icons.Loading />}
                            Zapisz
                        </Button> 
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
