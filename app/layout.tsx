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
      <body className="containe mx-auto flex flex-col justify-between h-screen px-6">
        <div className="flex-1">{children}</div>
        <MobileNavbar />
      </body>
    </html>
  );
}
