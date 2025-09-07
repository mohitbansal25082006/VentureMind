"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Brain, User, LogOut, LayoutDashboard } from "lucide-react"

export function Navbar() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const NavLinks = () => (
    <>
      <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
        Features
      </Link>
      <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
        How It Works
      </Link>
      <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
        Pricing
      </Link>
    </>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Brain className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">VentureMind</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavLinks />
          </nav>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <Brain className="h-6 w-6" />
              <span className="font-bold">VentureMind</span>
            </Link>
            <nav className="mt-6 flex flex-col space-y-4">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <Brain className="h-6 w-6" />
              <span className="font-bold">VentureMind</span>
            </Link>
          </div>

          {status === "loading" ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback>
                      {session.user?.name?.charAt(0) || <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => signIn("google")}>
                Sign In
              </Button>
              <Button onClick={() => signIn("google")}>
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}