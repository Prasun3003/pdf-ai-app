"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ScrollProgress />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
