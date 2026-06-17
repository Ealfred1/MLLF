import type { Metadata } from "next";
import DonateClient from "./DonateClient";

export const metadata: Metadata = {
  title: "Support Our Work | Maryann's Love & Light Foundation",
  description: "Fuel our outreaches with direct donations. Choose to support one-time or monthly. 100% of your gift reaches those in need with food, care, and school fees.",
  openGraph: {
    title: "Support Our Work | Maryann's Love & Light Foundation",
    description: "Fuel our outreaches with direct donations. Choose to support one-time or monthly. 100% of your gift reaches those in need with food, care, and school fees.",
  },
};

export default function DonatePage() {
  return <DonateClient />;
}
