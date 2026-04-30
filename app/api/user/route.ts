// /app/api/user/route.ts

import axios from "axios"
import { cookies } from "next/headers"

export const runtime = "nodejs"

export async function GET() {
  try {
    const cookieStore = await cookies()

    let access_token = cookieStore.get("tt_access_token")?.value
    const refresh_token = cookieStore.get("tt_refresh_token")?.value

    if (!access_token) {
      return Response.json({ user: null, videos: [] })
    }

    // 🔁 OPTIONAL: refresh token if needed (basic version)
    async function refreshAccessToken() {
      if (!refresh_token) return null

      const res = await axios.post(
        "https://open.tiktokapis.com/v2/oauth/token/",
        new URLSearchParams({
          client_key: process.env.TIKTOK_CLIENT_KEY!,
          client_secret: process.env.TIKTOK_CLIENT_SECRET!,
          grant_type: "refresh_token",
          refresh_token: refresh_token,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )

      const newAccessToken = res.data?.data?.access_token

      if (newAccessToken) {
        cookieStore.set("tt_access_token", newAccessToken)
        return newAccessToken
      }

      return null
    }

    // 🔥 FETCH USER
    let userResponse

    try {
      userResponse = await axios.get(
        "https://open.tiktokapis.com/v2/user/info/",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            fields: "open_id,union_id,avatar_url,display_name",
          },
        }
      )
    } catch (err: any) {
      // token might be expired → refresh
      access_token = await refreshAccessToken()

      if (!access_token) {
        return Response.json({ user: null, videos: [] })
      }

      userResponse = await axios.get(
        "https://open.tiktokapis.com/v2/user/info/",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            fields: "open_id,union_id,avatar_url,display_name",
          },
        }
      )
    }

    // 🔥 FETCH VIDEOS
    let videosResponse

    try {
      videosResponse = await axios.post(
        "https://open.tiktokapis.com/v2/video/list/",
        {
          max_count: 12,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          params: {
            fields:
              "id,title,video_description,duration,cover_image_url,embed_link",
          },
        }
      )
    } catch (err: any) {
      console.error("Video fetch failed:", err.response?.data)
      videosResponse = { data: { data: { videos: [] } } }
    }

    const user = userResponse.data?.data?.user
    const videos = videosResponse.data?.data?.videos || []

    return Response.json({
      user,
      videos,
    })
  } catch (error: any) {
    return Response.json({
      user: null,
      videos: [],
      error: error.message,
    })
  }
}