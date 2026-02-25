import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { APP_BACKGROUND_IMAGE } from "@/config/assets";
import { Toaster } from "@/components/ui/sonner";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Autoleap AIR - AI-Powered Phone System",
  description: "Transform your automotive shop with AI-powered phone management and customer service automation.",
  keywords: ["automotive", "AI", "phone system", "customer service", "automation"],
  authors: [{ name: "Autoleap" }],
  creator: "Autoleap",
  publisher: "Autoleap",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Autoleap AIR - AI-Powered Phone System",
    description: "Transform your automotive shop with AI-powered phone management and customer service automation.",
    siteName: "Autoleap AIR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Autoleap AIR - AI-Powered Phone System",
    description: "Transform your automotive shop with AI-powered phone management and customer service automation.",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} antialiased`} style={{ backgroundImage: `url(${APP_BACKGROUND_IMAGE})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
        <div className="min-h-dvh bg-white/0">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
