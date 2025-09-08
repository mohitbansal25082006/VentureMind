// src/components/navbar.tsx (Advanced Branding Update)
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
  Menu,
  BookOpen,
  FileText,
  Lightbulb,
  Video,
  Users,
  Star,
} from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link
        href="/"
        className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
        onClick={() => setIsOpen(false)}
      >
        Home
      </Link>
      {session && (
        <>
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/validate"
            className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            Validate Idea
          </Link>
          <Link
            href="/dashboard/reports"
            className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            Reports
          </Link>
          <Link
            href="/dashboard/analytics"
            className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            Analytics
          </Link>
          <Link
            href="/dashboard/resources"
            className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            Resources
          </Link>
        </>
      )}
      <Link
        href="/features"
        className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
        onClick={() => setIsOpen(false)}
      >
        Features
      </Link>
      <Link
        href="/how-it-works"
        className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
        onClick={() => setIsOpen(false)}
      >
        How It Works
      </Link>
    </>
  );

  const MobileNavLinks = () => (
    <div className="flex flex-col space-y-3">
      <Link
        href="/"
        className="flex items-center gap-3 text-lg font-medium p-3 rounded-lg hover:bg-accent"
        onClick={() => setIsOpen(false)}
      >
        <Home className="h-5 w-5" />
        Home
      </Link>
      {session && (
        <>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-lg font-medium p-3 rounded-lg hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            <BarChart3 className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/validate"
            className="flex items-center gap-3 text-lg font-medium p-3 rounded-lg hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            <Lightbulb className="h-5 w-5" />
            Validate Idea
          </Link>
          <Link
            href="/dashboard/reports"
            className="flex items-center gap-3 text-lg font-medium p-3 rounded-lg hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            <FileText className="h-5 w-5" />
            Reports
          </Link>
          <Link
            href="/dashboard/analytics"
            className="flex items-center gap-3 text-lg font-medium p-3 rounded-lg hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            <BarChart3 className="h-5 w-5" />
            Analytics
          </Link>
          <Link
            href="/dashboard/resources"
            className="flex items-center gap-3 text-lg font-medium p-3 rounded-lg hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            <BookOpen className="h-5 w-5" />
            Resources
          </Link>
        </>
      )}
      <Link
        href="/features"
        className="flex items-center gap-3 text-lg font-medium p-3 rounded-lg hover:bg-accent"
        onClick={() => setIsOpen(false)}
      >
        <Star className="h-5 w-5" />
        Features
      </Link>
      <Link
        href="/how-it-works"
        className="flex items-center gap-3 text-lg font-medium p-3 rounded-lg hover:bg-accent"
        onClick={() => setIsOpen(false)}
      >
        <Video className="h-5 w-5" />
        How It Works
      </Link>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12"> {/* Bigger logo */}
              <Image
                src="/logo.png"
                alt="VentureMind Logo"
                fill
                className="object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent group-hover:opacity-90 transition">
              VentureMind
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLinks />
          </nav>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 w-80">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8 mt-2">
                <div className="relative w-12 h-12">
                  <Image
                    src="/logo.png"
                    alt="VentureMind Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  VentureMind
                </span>
              </div>
              <nav className="flex-1 overflow-y-auto">
                <MobileNavLinks />
              </nav>
              <div className="py-4 border-t">
                {session ? (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={session.user?.image || ""}
                        alt={session.user?.name || ""}
                      />
                      <AvatarFallback>
                        {session.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{session.user?.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => signIn("google")}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
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
                      <p className="font-medium">{session.user?.name}</p>
                    )}
                    {session.user?.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {session.user?.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/reports" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    My Reports
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/analytics" className="flex items-center">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => signIn("google")}
                className="font-medium"
              >
                Sign In
              </Button>
              <Button
                onClick={() => signIn("google")}
                className="font-medium"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
