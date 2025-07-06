"use client";

import { cn } from "@/lib/utils";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";
import Header from "../layout/header";

interface ExtendedThemeProviderProps extends ThemeProviderProps{
    containerClassName?: string
}
    

export default function ThemeProvider({
    children,
    containerClassName,
    ...props
}: ExtendedThemeProviderProps ) {
    
    return (
      <NextThemesProvider {...props}>
        <Header />
        <main className={cn("conatiner mx-auto px-4", containerClassName)}>
          {children}
        </main>
        {/*footer compnets*/}
      </NextThemesProvider>
    );
}