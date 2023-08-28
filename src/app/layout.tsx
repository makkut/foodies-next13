import Header from "@/components/Header/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import Providers from "./providers";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foodies",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Header />
        <Providers>
          <div className="min-h-[75vh]">{children}</div>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
