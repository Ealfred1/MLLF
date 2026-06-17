import type { Metadata } from "next";
import VolunteerClient from "./VolunteerClient";

export const metadata: Metadata = {
  title: "Volunteer With Us | Maryann's Love & Light Foundation",
  description: "Join our growing volunteer family. Bring food, books, and care directly to less-privileged communities in Nigeria. Apply in under 3 minutes.",
  openGraph: {
    title: "Volunteer With Us | Maryann's Love & Light Foundation",
    description: "Join our growing volunteer family. Bring food, books, and care directly to less-privileged communities in Nigeria. Apply in under 3 minutes.",
  },
};

export default function VolunteerPage() {
  return <VolunteerClient />;
}
