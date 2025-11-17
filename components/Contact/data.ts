import { Mail, Phone, MapPin, Clock, MessageCircle, Headphones } from "lucide-react";

export interface ContactInfoItem {
  icon: typeof Mail;
  title: string;
  details: string;
  subtitle: string;
  gradient: string;
  link: string;
}

export const contactInfo: ContactInfoItem[] = [
  {
    icon: Mail,
    title: "Email Us",
    details: "support@eazr.in",
    subtitle: "We'll respond within 24 hours",
    gradient: "from-brand-primary to-brand-secondary",
    link: "mailto:support@eazr.in",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+91 (800) 123-4567",
    subtitle: "Mon-Fri, 9AM to 6PM IST",
    gradient: "from-brand-secondary to-brand-dark",
    link: "tel:+918001234567",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Mumbai, India",
    subtitle: "Headquarters",
    gradient: "from-brand-dark to-brand-primary",
    link: "#",
  },
];

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    question: "What is Eazr and how does it work?",
    answer: "Eazr is a fintech platform that makes credit accessible for healthcare, education, and everyday essentials. We provide instant loans, insurance on EMI, and scan & pay using credit—all designed for working Indians who need access, not complexity.",
    category: "General",
  },
  {
    question: "How quickly can I get approved for credit?",
    answer: "Our AI-powered approval system can process your application in minutes. Most users receive instant approval, with funds disbursed within 24 hours of verification.",
    category: "Credit",
  },
  {
    question: "Are there any hidden fees or charges?",
    answer: "No, we believe in complete transparency. All fees, interest rates, and charges are clearly displayed upfront before you accept any credit offer. What you see is what you pay.",
    category: "Fees",
  },
  {
    question: "Can I pay my insurance premiums in EMIs?",
    answer: "Yes! One of our core features is breaking down insurance premiums into flexible EMIs. This makes insurance more accessible without the burden of large upfront payments.",
    category: "Insurance",
  },
  {
    question: "What documents do I need to apply?",
    answer: "We keep paperwork minimal. Typically, you'll need a valid ID proof, address proof, and income verification. Our digital process makes it quick and easy to upload these documents.",
    category: "Application",
  },
  {
    question: "Is my data secure with Eazr?",
    answer: "Absolutely. We use bank-grade encryption and follow strict data protection protocols. Your personal and financial information is stored securely and never shared without your consent.",
    category: "Security",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach us via email at support@eazr.in, call us at +91 (800) 123-4567 (Mon-Fri, 9AM-6PM IST), or use the contact form on this page. We aim to respond within 24 hours.",
    category: "Support",
  },
  {
    question: "Can I prepay my loan without penalties?",
    answer: "Yes! We encourage early repayment and do not charge any prepayment penalties. You can pay off your loan anytime to reduce your interest burden.",
    category: "Repayment",
  },
];

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
  color: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "Twitter",
    href: "https://twitter.com/eazr",
    icon: "twitter",
    color: "text-[#1DA1F2]",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/eazr",
    icon: "linkedin",
    color: "text-[#0A66C2]",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/eazr",
    icon: "instagram",
    color: "text-[#E4405F]",
  },
];
