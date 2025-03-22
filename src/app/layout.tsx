import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Practice to create a Next.js app on Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <header>This is the header defined in layout.tsx</header>
        {children}
        <footer>This is the footer defined in layout.tsx</footer>
      </body>
    </html>
  );
}
