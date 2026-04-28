// /app/page.tsx

import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

      {/* HERO */}
      <section className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Turn Your TikTok Data Into
          <span className="text-pink-500"> Insight</span>
        </h1>

        <p className="mt-6 text-lg text-gray-400">
          Connect your TikTok account and explore your profile, stats, and content
          through a modern, interactive dashboard.
        </p>

        {/* CTA */}
        <div className="mt-8">
          <Link
            href="/api/auth/login_to_tiktok"
            className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition"
          >
            Connect TikTok
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-20 grid gap-6 md:grid-cols-3 max-w-5xl">
        <div className="p-6 border border-gray-800 rounded-xl">
          <h3 className="text-xl font-semibold">Profile Insights</h3>
          <p className="text-gray-400 mt-2">
            View your TikTok identity with clean and structured data.
          </p>
        </div>

        <div className="p-6 border border-gray-800 rounded-xl">
          <h3 className="text-xl font-semibold">Secure Login</h3>
          <p className="text-gray-400 mt-2">
            OAuth-based authentication ensures your data stays protected.
          </p>
        </div>

        <div className="p-6 border border-gray-800 rounded-xl">
          <h3 className="text-xl font-semibold">Modern UI</h3>
          <p className="text-gray-400 mt-2">
            Built with performance and aesthetics in mind.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 text-sm text-gray-500">
        Built with Next.js • Tailwind • TikTok API
      </footer>
    </main>
  )
}