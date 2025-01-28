import type { Metadata } from "next";
import "./globals.css";
import ContextWrapper, { useAppContext } from "@/components/Providers";
import MobileNavbar from "@/components/mobile/MobileNavbar";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Noted",
  description: "Note taking app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ContextWrapper>
        <html lang="en" id="dark">
          <body className="mx-auto flex flex-col h-screen md:px-6 dark:bg-stone-900 dark:text-neutral-200 dark-transition relative overflow-hidden md:overflow-auto">
            {children}
          </body>
        </html>
      </ContextWrapper>
    </AuthProvider>
  );
}
