import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Light.woff2",
      weight: "300",
    },
    {
      path: "../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
    },
    {
      path: "../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-satoshi",
});

const interDisplay = localFont({
  src: [
    {
      path: "../public/fonts/InterDisplay-Medium.woff2",
      weight: "500",
    },
  ],
  variable: "--font-inter-display",
});

export const metadata: Metadata = {
  title: "Eazr AI",
  description: "Eazr AI: Coded AI Chat Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="text-[calc(0.7rem+0.35vw)] max-[2300px]:text-[calc(0.7rem+0.32vw)] max-[2150px]:text-[calc(0.7rem+0.28vw)] max-4xl:text-[1rem]"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        {/* Material Symbols Icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />

        {/* Description no longer than 155 characters */}
        <meta
          name="description"
          content="Eazr AI: Coded AI Chat Companion"
        />

        {/* Eazr AI: Coded AI Chat Companion */}
        <meta
          name="product-name"
          content="Eazr AI: Coded AI Chat Companion"
        />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@ui8" />
        <meta
          name="twitter:title"
          content="Eazr AI: Coded AI Chat Companion"
        />
        <meta
          name="twitter:description"
          content="A powerful coded AI chat experience"
        />
        <meta name="twitter:creator" content="@ui8" />
        {/* Twitter Summary card images must be at least 120x120px */}
        <meta
          name="twitter:image"
          content="https://neuratalk-tau.vercel.app/twitter-card.png"
        />

        {/* Open Graph data for Facebook */}
        <meta
          property="og:title"
          content="EAZR AI: Coded AI Chat Companion"
        />
        <meta property="og:type" content="Article" />
        <meta
          property="og:url"
          content="https://ui8.net/odyssey-agency-d2aaee/products/neuratalk-your-smart-ai-chat-companion-coded"
        />
        <meta
          property="og:image"
          content="https://neuratalk-tau.vercel.app/fb-og-image.png"
        />
        <meta
          property="og:description"
          content="A powerful coded AI chat experience"
        />
        <meta
          property="og:site_name"
          content="NeuraTalk: Coded AI Chat Companion"
        />
        <meta property="fb:admins" content="132951670226590" />

        {/* Open Graph data for LinkedIn */}
        <meta
          property="og:title"
          content="NeuraTalk: Coded AI Chat Companion"
        />
        <meta
          property="og:url"
          content="https://ui8.net/odyssey-agency-d2aaee/products/neuratalk-your-smart-ai-chat-companion-coded"
        />
        <meta
          property="og:image"
          content="https://neuratalk-tau.vercel.app/linkedin-og-image.png"
        />
        <meta
          property="og:description"
          content="A powerful coded AI chat experience"
        />

        {/* Open Graph data for Pinterest */}
        <meta
          property="og:title"
          content="NeuraTalk: Coded AI Chat Companion"
        />
        <meta
          property="og:url"
          content="https://ui8.net/slabdsgn/products/elitefinancial---fintech-html--react--tailwind"
        />
        <meta
          property="og:image"
          content="https://neuratalk-tau.vercel.app/pinterest-og-image.png"
        />
        <meta
          property="og:description"
          content="A powerful coded AI chat experience"
        />
      </head>
      <body
        className={`${satoshi.variable} ${inter.variable} ${interDisplay.variable} bg-weak-50 font-satoshi text-p-sm text-strong-950 antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
