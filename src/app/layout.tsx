import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TickerScanner",
  description: "Analiza tus facturas de supermercado",
  icons: "/favicon.ico",
};

export const viewport: Viewport = {
  themeColor: "#ef4444",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-419">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
