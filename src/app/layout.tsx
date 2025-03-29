import type { Metadata } from "next";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";
import { createClient } from "@/utils/supabase/server";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Practice to create a Next.js app on Vercel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  let isLoggedIn: boolean = false;
  if (!error && data?.user) {
    isLoggedIn = true;
  }

  return (
    <html lang="ja">
      <body>
        <Header isLoggedIn={isLoggedIn}/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
