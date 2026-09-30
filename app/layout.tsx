import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Alexander Chen — Lead Design Engineer | Cinematic Story Portfolio",
  description:
    "A continuous cinematic scroll-driven portfolio. Discover, plan, and build digital experiences that help businesses get noticed, trusted, and chosen.",
  keywords: [
    "Design Engineer",
    "Creative Developer",
    "Portfolio",
    "Next.js",
    "GSAP",
    "Scroll Animation",
    "Interactive Web",
  ],
  authors: [{ name: "Alexander Chen" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#b5aaa0] text-stone-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
