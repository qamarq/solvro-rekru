import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function roundToNdecimals(num: number, n: number) {
    return Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
}