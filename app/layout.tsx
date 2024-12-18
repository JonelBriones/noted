import type { Metadata } from "next";
import "./globals.css";
import ContextWrapper from "@/components/Providers";
import MobileNavbar from "@/components/mobile/MobileNavbar";

export const metadata: Metadata = {
  title: "Noted",
  description: "Note taking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextWrapper>
      <html lang="en">
        <body className="containe mx-auto flex flex-col justify-between h-screen px-6 relative">
          {children}
          <MobileNavbar />
        </body>
      </html>
    </ContextWrapper>
  );
}
