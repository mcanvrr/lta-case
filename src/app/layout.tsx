import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "LTA Case Study",
  description: "LTA Case Study",
};

const manrope = Manrope({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${manrope.className} antialiased`}>
        <StoreProvider>
          <QueryProvider>{children}</QueryProvider>
          <Toaster position="top-right" />
        </StoreProvider>
      </body>
    </html>
  );
}
