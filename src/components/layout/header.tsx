"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">PDF AI</span>
            </Link>
            <AnimatedShinyText className="text-sm font-medium">
              Powered by AI
            </AnimatedShinyText>
          </div>
          <div className="hidden space-x-8 md:flex">
            {navigation.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors",
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <SignedIn>
              <Link
                href="/dashboard"
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors",
                  pathname === "/dashboard"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                )}
              >
                Dashboard
              </Link>
            </SignedIn>
          </div>
          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link
                href="/upload"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Upload PDF
              </Link>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </nav>
    </header>
  );
}
