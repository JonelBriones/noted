import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import NoteCard from "@/components/card/NoteCard";
import SidebarRight from "@/components/SidebarActions";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/NoteCardSidebar";
import MobileNavbar from "@/components/mobile/MobileNavbar";
import Dashboard from "@/components/Dashboard";

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
    <html lang="en">
      <body className="container mx-auto flex flex-col justify-between h-screen">
        <div className="flex flex-col md:flex-row flex-grow gap-6">
          <Navigation />
          <div className="w-full">{children}</div>
        </div>
        <MobileNavbar />
      </body>
    </html>
  );
}
