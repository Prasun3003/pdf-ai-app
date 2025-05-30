import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Layout } from "@/components/layout/layout";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDF Intelligence - AI-Powered PDF Analysis",
  description:
    "Transform your PDFs into actionable insights with advanced AI technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#2563eb" },
        elements: {
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
          footerActionLink: "text-blue-600 hover:text-blue-700",
          card: "bg-white dark:bg-gray-800",
          headerTitle: "text-gray-900 dark:text-white",
          headerSubtitle: "text-gray-600 dark:text-gray-400",
          socialButtonsBlockButton: "dark:bg-gray-700 dark:hover:bg-gray-600",
          socialButtonsBlockButtonText: "dark:text-white",
          formFieldInput: "dark:bg-gray-700 dark:text-white",
          formFieldLabel: "dark:text-gray-300",
          footer: "dark:text-gray-400",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <Layout>{children}</Layout>
          <Toaster position="top-center" expand={true} richColors closeButton />
        </body>
      </html>
    </ClerkProvider>
  );
}
