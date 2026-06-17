import type { Metadata } from "next";
import GalleryGridClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Outreach Gallery | Maryann's Love & Light Foundation",
  description: "View pictures of our hands-on work in communities across Nigeria. Every meal, every book, every smile is documented here.",
  openGraph: {
    title: "Outreach Gallery | Maryann's Love & Light Foundation",
    description: "View pictures of our hands-on work in communities across Nigeria. Every meal, every book, every smile is documented here.",
  },
};

export default function GalleryPage() {
  return <GalleryGridClient />;
}
