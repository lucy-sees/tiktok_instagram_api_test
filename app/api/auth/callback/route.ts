// /app/api/auth/callback/route.ts

import axios from "axios"
import { cookies } from "next/headers"

export const runtime = "nodejs"

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies()
    const { searchParams } = new URL(req.url)

    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    // 🔴 Handle TikTok errors
    if (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "TikTok returned an error",
          error,
        }),
        { status: 400 }
      )
    }

    // 🔴 Validate code
    if (!code) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing authorization code",
        }),
        { status: 400 }
      )
    }

    // 🧠 (Optional but recommended)
    // Validate state here if you're storing it
    // Example:
    // if (state !== storedState) { throw error }

    // 🔐 Exchange code → access token
    const tokenResponse = await axios.post(
      "https://open.tiktokapis.com/v2/oauth/token/",
      new URLSearchParams({
        client_key: process.env.TIKTOK_CLIENT_KEY!,
        client_secret: process.env.TIKTOK_CLIENT_SECRET!,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: process.env.TIKTOK_REDIRECT_URI!,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )

    const tokenData = tokenResponse.data

    const access_token = tokenData?.data?.access_token
    const refresh_token = tokenData?.data?.refresh_token

    cookieStore.set("tt_access_token", access_token)
    cookieStore.set("tt_refresh_token", refresh_token)

    if (!access_token) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Failed to retrieve access token",
          raw: tokenData,
        }),
        { status: 500 }
      )
    }

    // 🔥 Fetch user profile
    const userResponse = await axios.get(
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

    const userData = userResponse.data

    // ✅ SUCCESS RESPONSE
    return new Response(
      JSON.stringify({
        success: true,
        token: tokenData.data,
        user: userData.data,
      }),
      { status: 200 }
    )

  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Callback failed",
        error: error.response?.data || error.message,
      }),
      { status: 500 }
    )
  }
}