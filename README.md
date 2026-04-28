# 🎵 TikTok OAuth Dashboard (Using Next.js)

A simple web app that lets you log in with your TikTok account and fetch your profile data.

This project is built using Next.js and demonstrates how real-world authentication systems (OAuth + PKCE) work behind the scenes.

---

## 🚀 What This Project Does

- Lets you log in using your TikTok account
- Securely connects to TikTok’s API
- Fetches basic profile information
- Shows how modern authentication flows actually work

---

## 🧠 If You're New to Next.js

No stress—here’s the quick idea:

- Next.js is a framework built on React
- It lets you build both **frontend (UI)** and **backend (API routes)** in one project

In this app:
- The **UI** is your landing page (`page.tsx`)
- The **backend** lives inside `/app/api/...`

So you don’t need a separate server—Next.js handles everything.

---

## 🏗️ How This Project is Structured

```

/app
page.tsx → The homepage (what users see)

/api
/auth
/login_to_tiktok
route.ts → Starts login process

/callback
route.ts → Handles TikTok response

````

---

## 🔐 How Login Works (Simple Explanation)

When you click **"Connect TikTok"**:

1. You are redirected to TikTok
2. You log in and approve access
3. TikTok sends you back to this app
4. The app exchanges that response for your data

This is called **OAuth 2.0** (used by Google, Facebook, etc.)

---

## 🔑 Important Concept: PKCE (Security Layer)

TikTok requires an extra security step:

- A secret code is generated before login
- TikTok checks it when you come back

This prevents attacks and keeps your login safe.

---

## ⚙️ Setup Instructions (Step-by-Step)

### 1. Clone the project

```bash id="qljapg"
git clone <your-repo-url>
cd tiktok-demo
````

---

### 2. Install dependencies

```bash id="r62vzx"
npm install
```

---

### 3. Create a TikTok Developer App

Go to:
👉 TikTok for Developers

Then:

* Create a new app
* Copy your **Client Key** and **Client Secret**
* Set redirect URL to:

```
http://localhost:3000/api/auth/callback
```

---

### 4. Add environment variables

Create a file called `.env.local`:

```env id="f1q3c8"
TIKTOK_CLIENT_KEY=your_client_key
TIKTOK_CLIENT_SECRET=your_client_secret
TIKTOK_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

---

### 5. Run the project

```bash id="6xnd8f"
npm run dev
```

Open:

```
http://localhost:3000
```

Click **Connect TikTok** and test the login flow.

---

## ⚠️ Common Errors (and Fixes)

### ❌ “Something went wrong” (code_challenge)

👉 You didn’t implement PKCE correctly

---

### ❌ `createHash does not exist`

👉 Add this to your route:

```ts id="f2u0jq"
export const runtime = "nodejs"
```

---

### ❌ Cookie errors

👉 Use:

```ts id="cavp2d"
const cookieStore = await cookies()
```

---

## 🧭 What You’ve Learned From This Project

By completing this, you now understand:

* How real login systems work
* How APIs communicate securely
* How Next.js handles backend + frontend together
* Why authentication is more complex than it looks

---

## 🚀 What You Can Build Next

This project is just the foundation.

You can extend it into:

* A TikTok analytics dashboard
* A creator tools platform
* A multi-platform social media dashboard

---

## 👩‍💻 Author

Built by Lucy
Powered by HuruDevs 🚀

---

## 📜 License

[MIT License](https://github.com/lucy-sees/tiktok_api_test/blob/764e8f4f3d80db34b2670630ea97120332d81591/LICENSE)
