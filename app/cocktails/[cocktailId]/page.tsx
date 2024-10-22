import { getCocktail } from '@/actions/cocktails'
import { Icons } from '@/components/icons'
import LayoutContainer from '@/components/layout'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function CocktailDetailsPage(props: { params: Promise<{ cocktailId: string }> }) {
    const params = await props.params;
    const res = await getCocktail({ id: params.cocktailId ? +params.cocktailId : 0 })
    if (!res?.data || !res.data.cocktail) return notFound()
    const cocktail = res.data.cocktail

    return (
        <LayoutContainer>
            <Link href="/cocktails">
                <Button><Icons.ArrowLeft className='w-4 h-4 mr-2' />Powrót do koktajlów</Button>
            </Link>
            <div className='grid grid-cols-1 md:grid-cols-3 items-start mt-12 gap-0 md:gap-10'>
                <div className='flex items-center gap-10 col-span-2 flex-col md:flex-row'>
                    <Image 
                        src={cocktail.image} 
                        alt={cocktail.name} 
                        width={500} 
                        height={500} 
                        unoptimized
                        className='w-[300px] aspect-square object-contain rounded-md' 
                    />
                    <div className=''>
                        <h1 className='text-4xl font-cal'>{cocktail.name}</h1>
                        <p className='text-muted-foreground text-lg'>{cocktail.instruction}</p>

                        <div className='mt-10 flex flex-wrap'>
                            <span className='bg-primary text-white px-3 py-1 rounded-md mr-2 mb-2'>{cocktail.category.name}</span>
                            {cocktail.tags.map((tag) => (
                                <span 
                                    key={tag.id} 
                                    className='bg-primary-foreground text-white px-3 py-1 rounded-md mr-2 mb-2'
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 mt-10 md:mt-0'>
                    <Accordion type="single" collapsible className="w-full space-y-2">
                        {cocktail.ingredients.map((item) => (
                            <AccordionItem 
                                key={item.ingredient.id} 
                                value={`item-${item.ingredientId}`} 
                                className='flex flex-col border bg-muted/20 rounded-md p-3'
                            >
                                <AccordionTrigger className='hover:no-underline py-1'>
                                    <div className='flex items-center gap-2'>
                                        <Image 
                                            src={item.ingredient.image} 
                                            alt={item.ingredient.name} 
                                            unoptimized
                                            width={200} 
                                            height={200}
                                            className='w-[50px] aspect-square object-contain rounded-md' 
                                        />
                                        <div className='flex flex-col items-start justify-start text-left'>
                                            <h1>{item.ingredient.name}</h1>
                                            <p className='line-clamp-1 text-sm text-muted-foreground'>{item.ingredient.description}</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className='px-3 pt-3'>
                                        <h3 className='font-semibold text-base'>Opis składnika</h3>
                                        <p className='text-muted-foreground text-sm'>{item.ingredient.description}</p>

                                        <div className='flex items-center gap-2 mt-5'>
                                            <Badge variant={"secondary"}>Measure: {item.measure}</Badge>
                                            <Badge variant={"secondary"}>Ilość: x{item.quantity}</Badge>
                                            <Badge variant={item.ingredient.isAlcohol ? "destructive" : "default"}>Alkohol: 
                                                {item.ingredient.isAlcohol ? 
                                                    <Icons.Check className='w-4 h-4 ml-1' /> : 
                                                    <Icons.X className='w-4 h-4 ml-1' />
                                                }
                                            </Badge>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </LayoutContainer>
    )
}
