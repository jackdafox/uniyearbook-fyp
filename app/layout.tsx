import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Playfair } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "UniYearbook",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const playfair = Playfair({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} ${playfair.variable}`}>
      <body className="bg-background text-foreground">
        <Providers>
          <main className="min-h-screen flex flex-col items-center">
            {/* <Navbar/> */}
            {children}
          </main>
          <Toaster />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
