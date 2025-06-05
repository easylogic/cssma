import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Figm.ai - The Figma Maker Platform",
  description: "Where designers become makers. Transform Figma designs into real products with AI. From mockups to production code, components, and complete applications.",
  keywords: "Figma, AI, maker platform, design to code, component generation, design system, no-code, low-code, creative tools",
  authors: [{ name: "Figm.ai Team" }],
  openGraph: {
    title: "Figm.ai - The Figma Maker Platform",
    description: "Where designers become makers. Transform Figma designs into real products with AI-powered tools.",
    url: "https://figm.ai.kr",
    siteName: "Figm.ai",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Figm.ai - The Figma Maker Platform",
    description: "Where designers become makers. Transform Figma designs into real products with AI-powered tools.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
