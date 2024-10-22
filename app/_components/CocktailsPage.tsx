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
import { Skeleton } from "@/components/ui/skeleton";

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

    return (
        <LayoutContainer className="">
            <LayoutTitle>{favorite ? "Twoje ulubione" : "Wszystkie koktajle"}</LayoutTitle>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : null}
                {data?.map(cocktail => (
                    <CocktailCard key={cocktail.id} cocktail={cocktail} />
                ))}
                {data?.length === 0 && !isLoading ? <div>Brak koktajli</div> : null}
            </div>
        </LayoutContainer>
    );
}

const SkeletonCard = () => (
    <Card className="overflow-hidden bg-card/50 relative">
        <Button variant={"outline"} size={"icon"} className="absolute top-2 left-2 w-[40px] h-[40px]">
            <Icons.HeartEmpty className="text-rose-500 w-5 h-5" />
        </Button>
        <Skeleton className="aspect-square" />
        <CardContent className="p-5">
            <div className="flex items-center justify-between flex-col md:flex-row">
                <Skeleton className="w-20 h-6" />
                <Badge><Skeleton className="h-4 w-10" /></Badge>
            </div>
            <Skeleton className="h-4 w-full mt-4" />
        </CardContent>
    </Card>
)

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
                    <div className="flex items-center justify-between flex-col md:flex-row">
                        <h1 className="text-xl font-cal translate-y-[1px]">{cocktail.name}</h1>
                        <Badge>Składniki: {cocktail.ingredients.length}</Badge>
                    </div>
                    <h3 className="mt-4 text-sm text-muted-foreground line-clamp-1">{cocktail.instruction}</h3>
                </CardContent>
            </Card>
        </Link>
    )
}