"use client"

import { getCocktails, updateCocktail } from "@/actions/cocktails";
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import LayoutContainer, { LayoutTitle } from "@/components/layout";
import { getCocktailType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useState } from "react";
import { toast } from "sonner";

export default function CocktailsPage({ favorite }: { favorite?: boolean }) {
    const { data, isLoading } = useQuery({
        queryKey: [`cocktails-${favorite ? "favorite" : "all"}`],
        queryFn: async () => {
            const res = await getCocktails({ favorite });
            if (!res?.data || res.data.failure) throw new Error("Failed to fetch cocktails");
            return res.data.cocktails
        },
        refetchOnMount: true,
    })

    // const handleAddTestCoctail = async () => {
    //     const promise = new Promise<{ name: string }>(async (resolve, reject) => {
    //         const addCategoryRes = await addCategory({ name: 'Ordinary Drink' });
    //         if (!addCategoryRes?.data || addCategoryRes.data.failure) reject(addCategoryRes?.data?.failure); 
    //         const categoryId = addCategoryRes!.data!.category!.id;

    //         await addTag({ name: 'IBA' });
    //         await addTag({ name: 'Classic' });

    //         await addIngredient({ 
    //             name: 'Gin', 
    //             description: 'Gin is a distilled alcoholic drink that derives its predominant flavour from juniper berries (Juniperus communis). Gin is one of the broadest categories of spirits, all of various origins, styles, and flavour profiles, that revolve around juniper as a common ingredient.\r\n\r\nFrom its earliest origins in the Middle Ages, the drink has evolved from a herbal medicine to an object of commerce in the spirits industry. Gin emerged in England after the introduction of the jenever, a Dutch liquor which originally had been a medicine. Although this development had been taking place since early 17th century, gin became widespread after the William of Orange-led 1688 Glorious Revolution and subsequent import restrictions on French brandy.\r\n\r\nGin today is produced in subtly different ways, from a wide range of herbal ingredients, giving rise to a number of distinct styles and brands. After juniper, gin tends to be flavoured with botanical/herbal, spice, floral or fruit-flavours or often a combination. It is most commonly consumed mixed with tonic water. Gin is also often used as a base spirit to produce flavoured gin-based liqueurs such as, for example, Sloe gin, traditionally by the addition of fruit, flavourings and sugar.', 
    //             isAlcohol: true, 
    //             image: 'https://cocktails.solvro.pl/images/ingredients/gin.png', 
    //             type: 'Test' 
    //         });
    //         await addIngredient({ 
    //             name: 'Sweet Vermouth', 
    //             description: 'Vermouth (/vərˈmuːθ/ ver-MOOTH; also UK: /ˈvɜːrməθ/;) is an aromatized, fortified wine flavored with various botanicals (roots, barks, flowers, seeds, herbs, and spices).\r\n\r\nThe modern versions of the beverage were first produced in the mid to late 18th century in Turin, Italy. While vermouth was traditionally used for medicinal purposes, its true claim to fame is as an aperitif, with fashionable cafes in Turin serving it to guests around the clock. However, in the late 19th century it became popular with bartenders as a key ingredient in many classic cocktails that have survived to date, such as the Martini, the Manhattan, the Rob Roy, and the Negroni. In addition to being consumed as an aperitif or cocktail ingredient, vermouth is sometimes used as an alternative white wine in cooking.\r\n\r\nHistorically, there have been two main types of vermouth: sweet and dry. Responding to demand and competition, vermouth manufacturers have created additional styles, including extra-dry white, sweet white (bianco), red, amber (ambre or rosso), and rosé. Vermouth is produced by starting with a base of a neutral grape wine or unfermented wine must. Each manufacturer adds additional alcohol and a proprietary mixture of dry ingredients, consisting of aromatic herbs, roots, and barks, to the base wine, base wine plus spirit or spirit only – which may be redistilled before adding to the wine or unfermented wine must. After the wine is aromatized and fortified, the vermouth is sweetened with either cane sugar or caramelized sugar, depending on the style. Italian and French companies produce most of the vermouth consumed throughout the world, although the United States and the United Kingdom are also producers.', 
    //             isAlcohol: true, 
    //             image: 'https://cocktails.solvro.pl/images/ingredients/sweet-vermouth.png', 
    //             type: 'Gin' 
    //         });
    //         await addIngredient({ 
    //             name: 'Campari', 
    //             description: '', 
    //             isAlcohol: true, 
    //             image: 'https://cocktails.solvro.pl/images/ingredients/campari.png', 
    //             type: 'Liquer' 
    //         });

    //         const addCoctailRes = await addCocktail({
    //             name: 'Negroni',
    //             instruction: 'Stir into glass over ice, garnish and serve.',
    //             ingredients: [
    //                 { ingredientId: 1, quantity: 1, measure: '1 oz' },
    //                 { ingredientId: 2, quantity: 1, measure: '1 oz' },
    //                 { ingredientId: 3, quantity: 1, measure: '1 oz' }
    //             ],
    //             tags: [ 1,2 ],
    //             image: 'https://placehold.co/400',
    //             categoryId,
    //         })

    //         if (!addCoctailRes?.data || addCoctailRes.data.failure) reject(addCoctailRes?.data?.failure);
    //         refetch()
    //         resolve({ name: addCoctailRes!.data!.cocktail!.name });
    //     });
    //     toast.promise(promise, {
    //         loading: 'Dodawanie...',
    //         success: (data: { name: string }) => {
    //           return `Dodano nowy koktajl o nazwie ${data.name}`;
    //         },
    //         error: 'Error',
    //     });
    // }
    return (
        <LayoutContainer className="">
            <LayoutTitle>{favorite ? "Twoje ulubione" : "Wszystkie koktajle"}</LayoutTitle>
            <div className="grid grid-cols-4 gap-6">
                {isLoading ? <div>Loading...</div> : null}
                {data?.map(cocktail => (
                    <CocktailCard key={cocktail.id} cocktail={cocktail} />
                ))}
                {data?.length === 0 && !isLoading ? <div>Brak koktajli</div> : null}
            </div>
            
            {/* <Button onClick={handleAddTestCoctail}>Dodaj testowy koktajl</Button> */}
        </LayoutContainer>
    );
}

const CocktailCard = ({ cocktail }: { cocktail: getCocktailType }) => {
    const [isFavorite, setIsFavorite] = useState(cocktail.favorite)
    const { mutate } = useMutation({
        mutationFn: updateCocktail,
        onError: (error) => {
            setIsFavorite(!isFavorite)
            return toast.error(error?.message || "Wystąpił błąd podczas aktualizacji koktajlu")
        },
        onSuccess: (result) => {
            setIsFavorite(result?.data?.cocktail?.favorite || false)
        },
    });

    const handleToggleFavorite = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
      
        const oldState = isFavorite;
        setIsFavorite(!oldState);
      
        mutate({ id: cocktail.id, favorite: !oldState });
    };
    
    return (
        <Link href={`/cocktails/${cocktail.id}`}>
            <Card className="overflow-hidden bg-card/50 relative">
                <Button onClick={handleToggleFavorite} variant={"outline"} size={"icon"} className="absolute top-2 left-2 w-[40px] h-[40px]">
                    {isFavorite ? <Icons.Heart className="text-rose-500 w-5 h-5" /> : <Icons.HeartEmpty className="text-rose-500 w-5 h-5" />}
                </Button>
                <Image unoptimized src={cocktail.image} alt="" height={400} width={400} className="aspect-square object-contain bg-foreground/5 p-4" />
                <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-cal translate-y-[1px]">{cocktail.name}</h1>
                        <Badge>Składniki: {cocktail.ingredients.length}</Badge>
                    </div>
                    <h3 className="mt-4 text-sm text-muted-foreground line-clamp-1">{cocktail.instruction}</h3>
                </CardContent>
            </Card>
        </Link>
    )
}