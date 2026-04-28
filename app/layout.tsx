// /app/layout.tsx

import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "TikTok Analytics Dashboard | HuruDevs",
  description:
    "Connect your TikTok account and visualize your creator data with a modern, interactive dashboard built using Next.js and AI-powered insights.",
  keywords: [
    "TikTok API",
    "TikTok analytics",
    "creator dashboard",
    "Next.js project",
    "social media tools",
  ],
  authors: [{ name: "HuruDevs" }],
  creator: "HuruDevs",
  metadataBase: new URL("http://localhost:3000"),

  openGraph: {
    title: "TikTok Analytics Dashboard",
    description:
      "Visualize your TikTok profile and insights with a modern developer-built dashboard.",
    url: "http://localhost:3000",
    siteName: "HuruDevs",
    images: [
      {
        url: "/og-image.png", // add later
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TikTok Analytics Dashboard",
    description:
      "Connect your TikTok account and explore your creator insights.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}