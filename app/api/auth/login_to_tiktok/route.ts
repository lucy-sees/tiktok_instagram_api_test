// /app/api/auth/login_to_tiktok/route.ts

export const runtime = "nodejs"

export async function GET() {
  const client_key = process.env.TIKTOK_CLIENT_KEY!
  const redirect_uri = encodeURIComponent(process.env.TIKTOK_REDIRECT_URI!)

  const state = crypto.randomUUID()

  const url = `https://www.tiktok.com/v2/auth/authorize/?client_key=${client_key}&response_type=code&scope=user.info.basic&redirect_uri=${redirect_uri}&state=${state}`

  return Response.redirect(url)
}