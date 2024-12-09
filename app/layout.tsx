import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/sidebar/Navigation";
import NoteCard from "@/components/card/NoteCard";
import SidebarRight from "@/components/sidebar/SidebarRight";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/sidebar/Sidebar";

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
      <body className="flex justify-center">
        <div className="container flex h-screen mx-4">
          <Navigation />
          <div className="flex flex-col border-l">
            <Topbar />
            <div className="flex">
              {children}
              <SidebarRight />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
