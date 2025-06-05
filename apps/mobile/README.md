## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

Sign In
GET/POST /api/auth/signin

Redirects to your custom sign-in page at / (as configured in your pages.signIn)

Sign Out
GET/POST /api/auth/signout

Session
GET /api/auth/session

Returns current user session data

Callback (Google OAuth)
GET/POST /api/auth/callback/google

Handles Google OAuth callback

CSRF Token
GET /api/auth/csrf
