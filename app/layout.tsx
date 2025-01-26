import type { Metadata } from "next";
import "./globals.css";
import ContextWrapper, { useAppContext } from "@/components/Providers";
import MobileNavbar from "@/components/mobile/MobileNavbar";
import AuthProvider from "@/components/AuthProvider";
import Body from "@/components/Body";

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
        <Body children={children} />
        {/* <html lang="en" className="dark" id="dark">
          <body className="mx-auto flex flex-col h-screen px-6 relative dark:bg-neutral-800 dark:text-neutral-200">
            {children}
            <MobileNavbar />
          </body>
        </html> */}
      </ContextWrapper>
    </AuthProvider>
  );
}
