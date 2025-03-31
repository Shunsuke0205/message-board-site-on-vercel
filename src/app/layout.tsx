import type { Metadata } from "next";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";



export const metadata: Metadata = {
  title: "えん",
  description: "ひとりおやの方々のための交流サイト",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ja">
      <body className="max-sm:mx-3 md:max-w-screen-md md:mx-auto">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
