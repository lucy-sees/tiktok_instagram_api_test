// /app/layout.tsx

import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Creator Dashboard | HuruDevs",
  description:
    "Connect your social accounts and visualize your creator data with a modern dashboard.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <div className="min-h-screen flex flex-col">

          {/* NAVBAR */}
          <header className="w-full border-b border-gray-800 px-6 py-4 flex justify-between items-center">
            <h1 className="font-bold text-lg">HuruDevs</h1>
            <span className="text-sm text-gray-400">
              Creator Dashboard
            </span>
          </header>

          {/* MAIN */}
          <main className="flex-1">{children}</main>

          {/* FOOTER */}
          <footer className="text-center text-gray-500 text-sm py-6 border-t border-gray-800">
            Built with Next.js • TikTok API • Future Instagram API
          </footer>
        </div>
      </body>
    </html>
  )
}