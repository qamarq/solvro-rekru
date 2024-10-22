"use client"

/* eslint-disable @next/next/no-img-element */
import { Icons } from '@/components/icons';
import { BorderBeam } from '@/components/magicui/border-beam';
import Particles from '@/components/magicui/particles';
import { RainbowButton } from '@/components/ui/rainbow-button';

import HeroImage from '@/public/hero.webp';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);

    return (
        <main className="mx-auto flex-1 overflow-hidden">
            <section
                id="hero"
                className="relative mx-auto mt-44 max-w-[80rem] px-6 text-center md:px-8">
                <h1 className="font-cal bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-normal text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
                    Cocktails Solvro
                </h1>
                <p className="mb-12 text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
                    Jest to strona testowa, która ma na celu pokazanie możliwości.
                    <br className="hidden md:block" /> 
                    Za bardzo nie wiem, co tu napisać, więc piszę co mi przychodzi do głowy.
                </p>
                <div className='flex justify-center items-center gap-3 animate-fade-in opacity-0 [--animation-delay:400ms]'>
                    <Link href="/cocktails">
                        <RainbowButton className='text-primary font-cal'>
                            <span className='translate-y-[1px]'>Zobacz koktajle</span>
                            <Icons.ArrowRight className='w-4 h-4 ml-2' />
                        </RainbowButton>
                    </Link>
                    <Link href="https://github.com/qamarq/solvro-rekru">
                        <RainbowButton className='text-white font-cal !bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]'>
                            <span className='translate-y-[1px]'>Github</span>
                            <Icons.Github className='w-4 h-4 ml-2' />
                        </RainbowButton>
                    </Link>
                </div>
                <div className="relative mt-[8rem] animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-20 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]">
                    <div className="rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[filter:blur(180px)] before:[background-image:linear-gradient(to_bottom,hsl(var(--primary)),hsl(var(--primary)),transparent_40%)] before:animate-image-glow">
                        <BorderBeam colorFrom='hsl(var(--primary))' />
                        <Image
                            src={HeroImage}
                            alt="Hero Image"
                            className="relative w-full h-full rounded-[inherit] border object-contain"
                        />
                    </div>
                </div>
            </section>
            <section
                id="clients"
                className="text-center mx-auto max-w-[80rem] px-6 md:px-8">
                <div className="py-14">
                    <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                        <h2 className="text-center text-sm font-semibold text-gray-600">
                            JAKIŚ PRZYKŁADOWY TEKST KTÓRY NIE MA ZNACZENIA
                        </h2>
                        <div className="mt-6">
                            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 [&amp;_path]:fill-white">
                                <li>
                                    <img
                                        alt="Google"
                                        src="https://cdn.magicui.design/companies/Google.svg"
                                        className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                                    />
                                </li>
                                <li>
                                    <img
                                        alt="Microsoft"
                                        src="https://cdn.magicui.design/companies/Microsoft.svg"
                                        className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                                    />
                                </li>
                                <li>
                                    <img
                                        alt="GitHub"
                                        src="https://cdn.magicui.design/companies/GitHub.svg"
                                        className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                                    />
                                </li>
                                <li>
                                    <img
                                        alt="Uber"
                                        src="https://cdn.magicui.design/companies/Uber.svg"
                                        className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                                    />
                                </li>
                                <li>
                                    <img
                                        alt="Notion"
                                        src="https://cdn.magicui.design/companies/Notion.svg"
                                        className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <div className="[--color:hsl(var(--primary))] pointer-events-none relative -z-[2] mx-auto h-[50rem] overflow-hidden [mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_50%)] my-[-18.8rem] before:absolute before:inset-0 before:h-full before:w-full before:opacity-40 before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_70%)] after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:border-t after:border-[hsl(var(--border))] after:bg-background"></div>
            <Particles
                className="absolute inset-0 -z-10 animate-fade-up opacity-0 [--animation-delay:400ms]"
                quantity={20}
                ease={40}
                color={color}
                refresh
            />
        </main>
    );
}
