// app/layout.tsx
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import { Geist, Geist_Mono, League_Spartan } from "next/font/google";
import "./globals.css";
import { Quicksand } from "next/font/google";
import Navbar from "./components/Navbar";
import { Providers } from "./provider";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { RegisterSW } from "./components/RegisterSW";

// ✅ Next.js optimized fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-spartan", // Add this to body class
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you want
  variable: "--font-quicksand", // optional if using Tailwind's custom font
});

export const metadata: Metadata = {
  title: "CVGenie",
  description: "Create stunning resumes in minutes with AI-powered assistance. Professional resume generator with multiple templates and PDF export.",
  keywords: ["resume", "cv", "generator", "AI", "job application", "PDF"],
  authors: [{ name: "CodewithEvilxd" }],
  creator: "CodewithEvilxd",
  publisher: "CodewithEvilxd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/cvGenie-logo.png", sizes: "any" },
      { url: "/cvGenie-logo.png", sizes: "192x192", type: "image/png" },
      { url: "/cvGenie-logo.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/cvGenie-logo.png",
    apple: "/cvGenie-logo.png",
  },
  openGraph: {
    title: "CVGenie",
    description: "Create stunning resumes in minutes with AI-powered assistance",
    url: "https://cv-genie-lx.vercel.app",
    siteName: "CVGenie",
    images: [
      {
        url: "/create-resume.png",
        width: 1200,
        height: 630,
        alt: "CVGenie Resume Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CVGenie",
    description: "Create stunning resumes in minutes with AI-powered assistance",
    images: ["/create-resume.png"],
    creator: "@codewithevilxd",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${leagueSpartan.variable} ${quicksand.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <RegisterSW />
        <Providers>
          <Navbar />
          {children}
          <PWAInstallPrompt />
            <Analytics />
        </Providers>
      </body>
    </html>
  );
}
