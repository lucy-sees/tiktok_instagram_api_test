import { cookies } from "next/headers"

function base64URLEncode(buffer: Buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

export async function GET() {
  const cookieStore = cookies()

  const code_verifier = base64URLEncode(crypto.randomBytes(32))
  const hash = crypto.createHash("sha256").update(code_verifier).digest()
  const code_challenge = base64URLEncode(hash)

  cookieStore.set("tt_code_verifier", code_verifier)

  const url = `https://www.tiktok.com/v2/auth/authorize/?client_key=${process.env.TIKTOK_CLIENT_KEY}&response_type=code&scope=user.info.basic&redirect_uri=${process.env.TIKTOK_REDIRECT_URI}&code_challenge=${code_challenge}&code_challenge_method=S256`

  return Response.redirect(url)
}