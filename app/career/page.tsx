import type { Metadata } from "next";
import CareerPage from "@/templates/CareerPage";

export const metadata: Metadata = {
  title: "Careers | EAZR - Join the Future of Credit",
  description:
    "Be part of EAZR's mission to make financial access seamless for everyone. We're building a smarter, fairer way to pay — and we're looking for bold thinkers to help us get there.",
  keywords: [
    "EAZR careers",
    "fintech jobs",
    "credit platform jobs",
    "remote jobs",
    "financial technology careers",
    "AI workflow specialist",
    "backend engineer",
    "data analyst",
  ],
  openGraph: {
    title: "Careers | EAZR - Join the Future of Credit",
    description:
      "Join EAZR's mission to make financial access seamless for everyone. Explore open positions and shape the future of credit.",
    type: "website",
  },
};

export default function Career() {
  return <CareerPage />;
}
