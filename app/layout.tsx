// app/layout.tsx
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import { Geist, Geist_Mono, League_Spartan } from "next/font/google";
import "./globals.css";
import { Quicksand } from "next/font/google";
import Navbar from "./components/Navbar";
import { Providers } from "./provider";

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
  description: "Create stunning resumes in minutes!",
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
        <Providers>
          <Navbar />
          {children}
            <Analytics />
        </Providers>
      </body>
    </html>
  );
}
