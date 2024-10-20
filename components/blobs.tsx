"use client"

import React from 'react'
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function Blobs() {
    const segment = useSelectedLayoutSegment()

    return (
        <div className={cn('relative container mx-auto', { 'h-screen absolute top-0 overflow-hidden': !segment })}>
            <div
                aria-hidden="true"
                className={cn("fixed hidden md:block dark:opacity-70 bottom-0 left-0 z-0 scale-150 blur-lg", { 'absolute': !segment })}>
                <Image
                    src="/gradients/left.png"
                    className="relative z-0 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                    alt="docs left background"
                    data-loaded="true"
                    width={512}
                    height={512}
                    draggable={false}
                />
            </div>
            <div
                aria-hidden="true"
                className={cn("fixed hidden md:block dark:opacity-70 top-0 right-0 z-0 rotate-12 scale-150 blur-lg", { 'absolute': !segment })}>
                <Image
                    src="/gradients/right.png"
                    className="relative z-0 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                    alt="docs right background"
                    data-loaded="true"
                    width={512}
                    height={512}
                    draggable={false}
                />
            </div>
        </div>
    )
}
