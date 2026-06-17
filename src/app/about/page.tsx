import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Maryann's Love & Light Foundation",
  description: "Learn about the story, mission, and the core values of Maryann's Love & Light Foundation. Meet the team showing up for communities across Nigeria.",
  openGraph: {
    title: "About Us | Maryann's Love & Light Foundation",
    description: "Learn about the story, mission, and the core values of Maryann's Love & Light Foundation. Meet the team showing up for communities across Nigeria.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
