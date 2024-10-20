"use client"

import { getCocktailType } from '@/lib/types'
import React, { useMemo } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import MultipleSelector from '@/components/ui/multiple-selector'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { Ingredient, IngredientOnCocktail, Tag } from '@prisma/client'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { addCocktail, deleteCocktail, updateCocktail } from '@/actions/cocktails'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

export default function CocktailAddEditPage(
    { 
        cocktail, 
        ingredients: allIngredients, 
        tags: allTags,
        categories: allCategories
    }: { 
        cocktail: getCocktailType | null | undefined, 
        ingredients: Ingredient[] | undefined, 
        tags: Tag[] | undefined,
        categories: Tag[] | undefined
    }
) {
    const [image, setImage] = React.useState<string>(cocktail?.image || "https://placeholder.co/400")
    const [name, setName] = React.useState<string>(cocktail?.name || "")
    const [instruction, setInstruction] = React.useState<string>(cocktail?.instruction || "")
    const [tags, setTags] = React.useState(cocktail?.tags.map(tag => {
        return {
            label: tag.name,
            value: tag.id.toString()
        }
    }) || [])
    const [ingredientsSheetOpened, setIngredientsSheetOpened] = React.useState<boolean>(false)
    const [categoryId, setCategoryId] = React.useState(cocktail?.categoryid || 0)
    const [ingredientsOnCocktail, setIngredientsOnCocktail] = React.useState<IngredientOnCocktail[]>(cocktail?.ingredients || [])
    const [isPending, startTransition] = React.useTransition()
    const router = useRouter()

    const handleSaveCocktail = () => {
        startTransition(async () => {
            try {
                if (!cocktail) {
                    const res = await addCocktail({
                        name,
                        image,
                        instruction,
                        categoryId,
                        tags: tags.map(tag => +tag.value),
                        ingredients: ingredientsOnCocktail
                    })
                    if (res?.data?.success) {
                        toast.success('Koktajl został dodany pomyślnie!')
                        router.replace('/dashboard/'+res?.data?.cocktail.id)
                    } else {
                        toast.error('Wystąpił błąd podczas zapisywania koktajlu')
                    }
                } else {
                    const res = await updateCocktail({
                        id: cocktail.id,
                        name,
                        image,
                        instruction,
                        categoryId,
                        tags: tags.map(tag => +tag.value),
                        ingredients: ingredientsOnCocktail
                    })
                    if (res?.data?.success) {
                        toast.success('Koktajl został zaktualizowany pomyślnie!')
                    } else {
                        toast.error('Wystąpił błąd podczas zapisywania koktajlu')
                    }
                }
            } catch (error) {
                console.error(error)
                toast.error('Wystąpił błąd podczas zapisywania koktajlu')
            }
        })
    }

    const { mutate: deleteCocktailFn, isPending: isPendingDelete } = useMutation({
        mutationFn: deleteCocktail,
        onSuccess: () => {
            toast.success('Koktajl został usunięty pomyślnie!')
            router.push('/dashboard')
        },
        onError: () => {
            toast.error('Wystąpił błąd podczas usuwania koktajlu')
        }
    })

    const preparedTags = useMemo(() => {
        return allTags?.map(tag => ({ label: tag.name, value: tag.id.toString() })) || []
    }, [allTags])

    const handleAddIngredient = (ingredient: Ingredient) => {
        // add or increment ingredientsOnCocktail
        const ingredientOnCocktail = ingredientsOnCocktail.find(ing => ing.ingredientId === ingredient.id)
        if (ingredientOnCocktail) {
            setIngredientsOnCocktail(prev => prev.map(ing => ing.ingredientId === ingredient.id ? { ...ing, quantity: ing.quantity + 1 } : ing))
        } else {
            setIngredientsOnCocktail(prev => [...prev, { cocktailId: cocktail?.id || 0, ingredientId: ingredient.id, quantity: 1, measure: '1 oz' }])
        }
        setIngredientsSheetOpened(false)
    }
    
    return (
        <div className='w-full grid grid-cols-2 gap-10'>
            <div className='flex flex-col'>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <Image 
                            src={image} 
                            alt={name} 
                            width={512} 
                            height={512} 
                            unoptimized
                            className='w-[120px] h-[120px] rounded-md object-contain' 
                        />
                        <div className='w-full flex flex-col gap-4'>
                            <div className='w-full grid grid-cols-2 gap-2'>
                                <div className='grid gap-2'>
                                    <Label>Nazwa</Label>
                                    <Input 
                                        placeholder='Wpisz nazwę koktajlu' 
                                        value={name} 
                                        className='w-full'
                                        onChange={(e) => setName(e.target.value)} 
                                    />
                                </div>
                                <div className='grid gap-2'>
                                    <Label>Zdjęcie</Label>
                                    <Input 
                                        placeholder='URL zdjęcia' 
                                        value={image} 
                                        className='w-full'
                                        onChange={(e) => setImage(e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div className='grid gap-2'>
                                <Label>Kategoria</Label>
                                <Select value={categoryId.toString()} onValueChange={(val) => setCategoryId(+val)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Wybierz kategorię" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {allCategories?.map(category => (
                                            <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-2 mt-3'>
                        <Label>Instrukcja przygotowania</Label>
                        <Textarea
                            placeholder='Wpisz instrukcję przygotowania'
                            value={instruction}
                            onChange={(e) => setInstruction(e.target.value)}
                        />
                    </div>
                    <div className='mt-3 grid gap-2'>
                        <Label>Tagi</Label>
                        <MultipleSelector
                            value={tags}
                            onChange={setTags}
                            defaultOptions={preparedTags}
                            placeholder="Wybierz tagi"
                            emptyIndicator={"Brak tagów do wyboru"}
                        />
                    </div>

                    <div className='mt-6 grid gap-2'>
                        <Button className='w-full' disabled={isPending} onClick={handleSaveCocktail}>
                            {isPending ? <Icons.Loading /> : <Icons.Save className='w-4 h-4 mr-2' />}Zapisz koktajl
                        </Button>
                        {cocktail && <Button onClick={() => deleteCocktailFn({ id: cocktail.id })} className='w-full' variant={"destructive"}>{isPendingDelete ? <Icons.Loading /> : <Icons.Trash className='w-4 h-4 mr-2' />}Usuń koktajl</Button>}
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold'>Składniki</h1>
                    <Button onClick={() => setIngredientsSheetOpened(prev => !prev)} variant={"secondary"} size={"icon"}><Icons.Plus className='w-4 h-4' /></Button>
                </div>

                <div className='mt-6 grid gap-2'>
                    {ingredientsOnCocktail.length === 0 && <p className='text-gray-500'>Brak składników do pokazania</p>}
                    {ingredientsOnCocktail.map(ing => {
                        const ingredient = allIngredients?.find(i => i.id === ing.ingredientId)
                        return (
                            <Card key={ing.ingredientId} className=''>
                                <CardHeader>
                                    <div className='flex gap-2'>
                                        <Image src={ingredient?.image || ""} unoptimized alt={""} width={200} height={200} className='w-[80px] h-[80px]' />
                                        <div>
                                            <CardTitle>{ingredient?.name}</CardTitle>
                                            <CardDescription className='line-clamp-3'>{ingredient?.description}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div className='grid gap-2'>
                                            <Label>Ilość</Label>
                                            <Input 
                                                value={ing.quantity} 
                                                onChange={(e) => setIngredientsOnCocktail(prev => prev.map(i => i.ingredientId === ing.ingredientId ? { ...i, quantity: +e.target.value } : i))} 
                                                placeholder='Wpisz ilość'
                                                type='number'
                                            />
                                        </div>
                                        <div className='grid gap-2'>
                                            <Label>Miara</Label>
                                            <Input 
                                                value={ing.measure} 
                                                onChange={(e) => setIngredientsOnCocktail(prev => prev.map(i => i.ingredientId === ing.ingredientId ? { ...i, measure: e.target.value } : i))} 
                                                placeholder='Wpisz miarę'
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>


            <Sheet open={ingredientsSheetOpened} onOpenChange={setIngredientsSheetOpened}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Nowy składnik</SheetTitle>
                        <SheetDescription>Wybierz składnik który chcesz dodać do koktajlu</SheetDescription>
                    </SheetHeader>

                    <div className="grid gap-6 py-4 mt-5">
                        {allIngredients?.map(ingredient => (
                            <div key={ingredient.id} className="flex items-center justify-between">
                                <div className='flex items-center gap-2'>
                                    <Image src={ingredient.image} alt={ingredient.name} width={200} height={200} className='w-[40px] h-[40px] rounded-md' unoptimized />
                                    <p>{ingredient.name}</p>
                                </div>
                                <Button 
                                    variant="secondary" 
                                    size="icon"
                                    onClick={() => handleAddIngredient(ingredient)}
                                >
                                    <Icons.Plus className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
