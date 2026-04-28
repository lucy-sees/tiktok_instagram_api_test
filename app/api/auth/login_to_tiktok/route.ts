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

  // 🔐 PKCE generation
  const code_verifier = base64URLEncode(crypto.randomBytes(32))
  const hash = crypto.createHash("sha256").update(code_verifier).digest()
  const code_challenge = base64URLEncode(hash)

  const state = crypto.randomUUID()

  const url = `https://www.tiktok.com/v2/auth/authorize/?client_key=${client_key}&response_type=${response_type}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}&code_challenge=${code_challenge}&code_challenge_method=S256`

  // ⚠️ TEMP: log verifier (we’ll store it properly next)
  console.log("CODE_VERIFIER:", code_verifier)

  return Response.redirect(url)
}