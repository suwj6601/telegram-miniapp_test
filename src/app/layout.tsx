import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test Telegram Mini App",
  description: "Miniapp using Nextjs14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        ></Script>

        <Script src="https://cdn.jsdelivr.net/npm/eruda"></Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
