import type { Metadata } from "next";
import ImpactClient from "./ImpactClient";

export const metadata: Metadata = {
  title: "Our Impact | Maryann's Love & Light Foundation",
  description: "Read real stories of Mrs. Okafor and local orphanages, and see how simple acts of kindness provide food, books, and fees across Nigeria.",
  openGraph: {
    title: "Our Impact | Maryann's Love & Light Foundation",
    description: "Read real stories of Mrs. Okafor and local orphanages, and see how simple acts of kindness provide food, books, and fees across Nigeria.",
  },
};

export default function ImpactPage() {
  return <ImpactClient />;
}
