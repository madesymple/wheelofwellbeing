import type { Metadata } from "next";
import "./globals.css";
import { Quicksand, Poppins, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wheel of Wellbeing — How Balanced Is Your Life?",
  description:
    "Take the free Wheel of Wellbeing quiz to discover your life balance across 8 key areas. Get a personalized roadmap to improve your wellbeing, designed by a licensed therapist.",
  openGraph: {
    title: "Wheel of Wellbeing — How Balanced Is Your Life?",
    description:
      "Take the free quiz and discover your life balance across 8 key areas of wellbeing.",
    siteName: "Wheel of Wellbeing",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        className={`${quicksand.variable} ${poppins.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
