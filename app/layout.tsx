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
  title: "Shohag Hossen — Full-Stack Developer | Portfolio & CV",
  description:
    "Full-Stack Developer, Technical Team Lead & IT Specialist crafting scalable web, mobile & cloud solutions with React, Node.js, Laravel, Flutter, and secure cloud architectures.",
  keywords: [
    "Shohag Hossen",
    "Full-Stack Developer",
    "Technical Team Lead",
    "React",
    "Node.js",
    "Laravel",
    "Flutter",
    "WordPress",
    "Portfolio",
    "CV",
  ],
  authors: [{ name: "Shohag Hossen" }],
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
