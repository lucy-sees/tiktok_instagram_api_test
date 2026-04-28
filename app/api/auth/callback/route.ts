import axios from "axios"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  if (!code) {
    return new Response("No code provided", { status: 400 })
  }

  try {
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

    const access_token = tokenResponse.data.access_token

    // 🔥 Now fetch user info
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

    return Response.json({
      token: tokenResponse.data,
      user: userResponse.data,
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify(error.response?.data || error.message),
      { status: 500 }
    )
  }
}