import type { Metadata } from "next";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Practice to create a Next.js app on Vercel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
