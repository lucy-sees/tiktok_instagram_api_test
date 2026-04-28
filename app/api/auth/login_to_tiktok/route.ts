function base64URLEncode(buffer: Buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

export async function GET() {
  const client_key = process.env.TIKTOK_CLIENT_KEY!
  const redirect_uri = process.env.TIKTOK_REDIRECT_URI!

  const scope = "user.info.basic"
  const response_type = "code"
  const state = crypto.randomUUID()

  const url = `https://www.tiktok.com/v2/auth/authorize/?client_key=${client_key}&response_type=${response_type}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`

  return Response.redirect(url)
}