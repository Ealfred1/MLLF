import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maryann's Love and Light Foundation | Charity Outreach Nigeria",
  description: "We show up for less privileged children and families across Nigeria — with food, school fees, books, and care. Join us or support our work today.",
  keywords: "Nigerian charity, community outreach Nigeria, donate to charity Nigeria, volunteer Nigeria, food donation Nigeria, orphanage support Nigeria, Maryann foundation",
  authors: [{ name: "Maryann's Love and Light Foundation" }],
  openGraph: {
    type: "website",
    siteName: "Maryann's Love and Light Foundation",
    title: "Maryann's Love and Light Foundation | Charity Outreach Nigeria",
    description: "Small acts of kindness. Real change for real people across Nigeria.",
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
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
