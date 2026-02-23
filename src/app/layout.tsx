import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TabNavigation } from "@/components/layout/tab-navigation";
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
  title: "CompeteHub — Competition Management Platform",
  description: "Event competition management with leaderboards, scoring, billing, and reporting",
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
        <TabNavigation />
        {children}
      </body>
    </html>
  );
}
