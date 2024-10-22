import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import "cal-sans";
import { ThemeProvider } from '@/components/theme-provider';
import AppTopbar from '@/components/app-topbar';
import { Toaster } from '@/components/ui/sonner';
import ReactQueryProvider from '@/components/react-query-provider';
import Blobs from '@/components/blobs';
import Link from 'next/link';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Solvro - Cocktails',
    description:
        'A web application featuring vector search and advanced cocktail management features.',
    keywords: [
        'Next.js',
        'Cocktails',
        'Vector Search',
        'TypeScript',
        'Prisma',
        'PostgreSQL',
    ],
    openGraph: {
        title: 'Solvro - Cocktails & Vector Search',
        description:
            'Discover the best cocktails with vector search technology.',
        url: 'https://solvro.kamilmarczak.pl',
        images: [
            {
                url: '/hero.png',
                width: 800,
                height: 600,
                alt: 'Cocktails Preview Image',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ReactQueryProvider>
                        <AppTopbar />
                        <main className='z-10 relative min-h-screen'>
                            {children}
                            <Toaster richColors />
                        </main>
                        <Blobs />
                        <footer className='mt-10 border-t p-5'>
                            <div className='container mx-auto flex flex-col items-center justify-center'>
                                <h1 className='font-cal text-base'>Made with ❤️ by <Link href="https://kamilmarczak.pl" className='text-primary'>Kamil Marczak</Link> for <Link href="https://solvro.pwr.edu.pl/" className='text-primary'>Solvro</Link></h1>
                                <h3 className='text-muted-foreground text-xs'>© 2024 Kamil Marczak. All rights reserved.</h3>
                            </div>
                        </footer>
                    </ReactQueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
