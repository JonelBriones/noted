import type { Metadata } from "next";
import "./globals.css";
import ContextWrapper from "@/components/Providers";
import MobileNavbar from "@/components/mobile/MobileNavbar";
import AuthProvider from "@/components/AuthProvider";
import Note from "@/models/Note";

export const metadata: Metadata = {
  title: "Noted",
  description: "Note taking app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const notesAPI = await Note.find({}).lean();
  console.log(notesAPI);
  return (
    <AuthProvider>
      <ContextWrapper notesAPI={JSON.parse(JSON.stringify(notesAPI))}>
        <html lang="en">
          <body className="containe mx-auto flex flex-col justify-between h-screen px-6 relative">
            {children}
            <MobileNavbar />
          </body>
        </html>
      </ContextWrapper>
    </AuthProvider>
  );
}
