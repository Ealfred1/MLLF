import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CursorLight from "@/components/CursorLight";
import PageTransition from "@/components/PageTransition";
import Lightbox from "@/components/Lightbox";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maryann's Love & Light Foundation",
  description: "One act of love. A lifetime of light. We show up for the forgotten — with food, school fees, books and care. No agenda. No middlemen.",
  authors: [{ name: "Maryann's Love & Light Foundation" }],
  openGraph: {
    type: "website",
    siteName: "Maryann's Love & Light Foundation",
    title: "Maryann's Love & Light Foundation",
    description: "One act of love. A lifetime of light.",
    url: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${roboto.variable}`}
    >
      <body>
        <SmoothScroll>
          <CursorLight />
          <PageTransition />
          <Header />
          {children}
          <Footer />
          <Lightbox />
        </SmoothScroll>
      </body>
    </html>
  );
}
