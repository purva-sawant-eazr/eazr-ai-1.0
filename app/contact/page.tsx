import type { Metadata } from "next";
import ContactPage from "@/templates/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | EAZR - Get in Touch",
  description:
    "Have questions about EAZR? Want to partner with us? Get in touch with our team. We're here to help make your credit experience seamless.",
  keywords: [
    "contact EAZR",
    "EAZR support",
    "get in touch",
    "customer service",
    "EAZR email",
    "EAZR phone",
    "fintech support",
    "credit platform contact",
  ],
  openGraph: {
    title: "Contact Us | EAZR - Get in Touch",
    description:
      "Have questions about EAZR? Get in touch with our team. We're here to help make your credit experience seamless.",
    type: "website",
  },
};

export default function Contact() {
  return <ContactPage />;
}
