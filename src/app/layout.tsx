import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "AgriSmart - AI-Powered Crop & Fertilizer Recommendations",
  description: "Transform your farming with personalized, data-driven insights. Get AI-powered crop and fertilizer recommendations to increase yields, reduce costs, and make informed agricultural decisions.",
  keywords: "agriculture, farming, soil analysis, crop recommendations, fertilizer calculator, AI farming, sustainable agriculture",
  authors: [{ name: "AgriSmart Team" }],
  openGraph: {
    title: "AgriSmart - Smart Farming Solutions",
    description: "AI-powered agricultural insights for better yields and sustainable farming",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
