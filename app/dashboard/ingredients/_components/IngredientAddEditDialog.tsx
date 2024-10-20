/* eslint-disable @next/next/no-img-element */
"use client"

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Ingredient } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertIngredientSchema } from '@/schemas';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export default function IngredientAddEditDialog({
    dialogOpened,
    setDialogOpened,
    editedIngredient,
    isPending,
    handleUpsertIngredient
}: Readonly<{
    dialogOpened: boolean,
    setDialogOpened: React.Dispatch<React.SetStateAction<boolean>>,
    editedIngredient: Ingredient | null,
    isPending: boolean,
    handleUpsertIngredient: (values: z.infer<typeof upsertIngredientSchema>) => void
}>) {
    const form = useForm<z.infer<typeof upsertIngredientSchema>>({
        resolver: zodResolver(upsertIngredientSchema),
        defaultValues: editedIngredient || { name: '', description: '', image: '', isAlcohol: false, type: '' },
    });

    const onSubmit = (values: z.infer<typeof upsertIngredientSchema>) => {
        handleUpsertIngredient(values)
    }

    const ingredientImage = form.watch('image')
    
    return (
        <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
            <DialogContent className='p-0'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className='flex items-center gap-2 p-6'>
                            <img src={ingredientImage || 'https://placeholder.co/100'} alt={""} className='w-[60px] rounded-md aspect-square object-contain' />
                            <DialogHeader>
                                <DialogTitle>{editedIngredient ? "Edytuj" : "Dodaj"} składnik</DialogTitle>
                                <DialogDescription>Możesz edytować i dodawać nowe składniki w tym miejscu</DialogDescription>
                            </DialogHeader>
                        </div>
                        
                        <div className='grid gap-4 p-6 pt-0'>
                            <div className='flex items-center gap-2'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Nazwa składnika</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Wpisz nazwę"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Zdjęcie</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="Wpisz URL zdjęcia"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Opis składnika</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Wpisz opisz"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isAlcohol"
                                render={({ field }) => (
                                    <FormItem className='flex items-center justify-between w-full border rounded-md p-3 space-y-0'>
                                        <div>
                                            <FormLabel>Zawartość z alkoholem</FormLabel>
                                            <FormDescription>Czy składnik zawiera alkohol?</FormDescription>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Typ</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Wpisz typ"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <Input placeholder='Nazwa tagu' value={editedName} onChange={(e) => setEditedName(e.target.value)} /> */}
                        </div>

                        <DialogFooter className='border-t p-6 py-3'>
                            <Button type='submit' disabled={isPending || !form.formState.isValid}>
                                {isPending && <Icons.Loading />}
                                {editedIngredient ? "Zapisz zmiany" : "Dodaj nowy"}
                            </Button> 
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
