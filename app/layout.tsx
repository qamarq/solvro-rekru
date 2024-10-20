import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import "cal-sans";
import Image from 'next/image';
import { ThemeProvider } from '@/components/theme-provider';
import AppTopbar from '@/components/app-topbar';
import { Toaster } from '@/components/ui/sonner';
import ReactQueryProvider from '@/components/react-query-provider';

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
    description: 'Generated by create next app',
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
                        <main className='z-10 relative'>
                            {children}
                            <Toaster richColors />
                        </main>
                        <div className='relative container mx-auto'>
                            <div
                                aria-hidden="true"
                                className="fixed hidden md:block dark:opacity-70 bottom-0 left-0 z-0 scale-150 blur-lg">
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
                                className="fixed hidden md:block dark:opacity-70 top-0 right-0 z-0 rotate-12 scale-150 blur-lg">
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
                    </ReactQueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
