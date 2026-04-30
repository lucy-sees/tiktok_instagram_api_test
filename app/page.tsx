"use client"

import { useEffect, useState } from "react"

type User = {
  display_name: string
  avatar_url: string
}

type Video = {
  id: string
  title: string
  cover_image_url: string
  embed_link: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/user")
        const data = await res.json()

        setUser(data.user)
        setVideos(data.videos || [])
      } catch (err) {
        console.error("Failed to fetch user:", err)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  // 🔄 LOADING STATE
  if (loading) {
    return (
      <main className="h-screen flex items-center justify-center">
        <p className="text-gray-400 animate-pulse">
          Loading your dashboard...
        </p>
      </main>
    )
  }

  // 🔐 NOT LOGGED IN
  if (!user) {
    return (
      <main className="h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold mb-4">
          Creator Dashboard
        </h1>

        <p className="text-gray-400 mb-6">
          Connect your TikTok to view your profile and videos
        </p>

        <a
          href="/api/auth/login_to_tiktok"
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Connect TikTok
        </a>
      </main>
    )
  }

  // ✅ AUTHENTICATED DASHBOARD
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">

      {/* PROFILE */}
      <section className="flex items-center gap-6 mb-10">
        <img
          src={user.avatar_url}
          alt="avatar"
          className="w-20 h-20 rounded-full border border-gray-700"
        />

        <div>
          <h2 className="text-2xl font-bold">
            {user.display_name}
          </h2>
          <p className="text-gray-400">TikTok Creator</p>
        </div>
      </section>

      {/* VIDEOS */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          Your Videos
        </h3>

        {videos.length === 0 ? (
          <p className="text-gray-400">
            No videos found or permission not granted.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:scale-[1.02] transition"
              >
                <img
                  src={video.cover_image_url}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <p className="text-sm font-medium line-clamp-2">
                    {video.title}
                  </p>

                  <a
                    href={video.embed_link}
                    target="_blank"
                    className="text-pink-500 text-sm mt-2 inline-block"
                  >
                    Watch →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* INSTAGRAM PLACEHOLDER */}
      <section className="mt-16">
        <h3 className="text-xl font-semibold mb-4">
          Instagram (Coming Soon)
        </h3>

        <div className="border border-dashed border-gray-700 rounded-xl p-6 text-center">
          <p className="text-gray-400">
            Instagram integration will appear here.
          </p>
        </div>
      </section>

    </main>
  )
}