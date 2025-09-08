// src/components/navbar.tsx (Updated)
"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Home,
  LogOut,
  Settings,
  Menu,
  BookOpen,
  FileText,
  Lightbulb,
  Download,
  Video,
  Users,
  Star,
} from "lucide-react";

export function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link
        href="/"
        className="text-sm font-medium hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Home
      </Link>
      {session && (
        <>
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/validate"
            className="text-sm font-medium hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Validate Idea
          </Link>
          <Link
            href="/dashboard/reports"
            className="text-sm font-medium hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Reports
          </Link>
          <Link
            href="/dashboard/analytics"
            className="text-sm font-medium hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Analytics
          </Link>
          <Link
            href="/dashboard/resources"
            className="text-sm font-medium hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Resources
          </Link>
        </>
      )}
      <Link
        href="#features"
        className="text-sm font-medium hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Features
      </Link>
      <Link
        href="#how-it-works"
        className="text-sm font-medium hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        How It Works
      </Link>
      <Link
        href="#pricing"
        className="text-sm font-medium hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Pricing
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Desktop Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">VentureMind</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <NavLinks />
          </nav>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="flex items-center space-x-2 mb-6"
              onClick={() => setIsOpen(false)}
            >
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">VentureMind</span>
            </Link>
            <nav className="flex flex-col space-y-4">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user?.image || ""}
                      alt={session.user?.name || ""}
                    />
                    <AvatarFallback>
                      {session.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {session.user?.name && (
                      <p className="font-medium">{session.user.name}</p>
                    )}
                    {session.user?.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {session.user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/reports">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    My Reports
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/resources">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Resources
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => signIn("google")}
                className="hidden sm:flex"
              >
                Sign In
              </Button>
              <Button onClick={() => signIn("google")}>Get Started</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}