"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


export default function Header() {

  const router = useRouter()

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "create Post",
      href: "/post/create",
    },
    {
      label: "Home",
      href: "/",
    },
  ];

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="font-bold text-xl">
            Next.js 15 Blog
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((navItem) => (
              <Link
                key={navItem.href}
                href={navItem.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                {navItem.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {/* Keep an placeholder for Search*/}
          </div>
          {/* Keep an placeholder for theme toogle*/}
          <div className="flex items-center gap-2">
            <Button className="cursor-pointer" onClick={()=> router.push("/auth")}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
