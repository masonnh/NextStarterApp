# Google OAuth Setup Guide for Supabase

This guide walks through connecting Google OAuth to your NextStarterApp via Supabase.

## Part 1: Google Cloud Console Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project selector at the top
3. Click "NEW PROJECT"
4. Enter project name: `NextStarterApp` (or your app name)
5. Click "CREATE"

### Step 2: Enable Google+ API

1. In Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google+ API"
3. Click on it and press **ENABLE**

### Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS** > **OAuth client ID**
3. If prompted, configure the OAuth consent screen first:
   - Choose **External** user type
   - Fill in required fields:
     - App name: `NextStarterApp`
     - User support email: your-email@example.com
     - Developer contact: your-email@example.com
   - Click **SAVE AND CONTINUE**
   - On scopes screen, click **SAVE AND CONTINUE** (default scopes are fine)
   - Click **SAVE AND CONTINUE** again

4. After consent screen is set, create OAuth client:
   - Application type: **Web application**
   - Name: `NextStarterApp Web Client`
   - Authorized JavaScript origins: Add both
     - `http://localhost:3000` (local development)
     - `https://yourdomain.com` (production domain)
   - Authorized redirect URIs: Add your Supabase callback URL
     - Format: `https://<your-supabase-project>.supabase.co/auth/v1/callback`
     - Also add for local: `http://localhost:3000/auth/v1/callback` (optional, for testing)
   - Click **CREATE**

5. Copy the credentials:
   - **Client ID**: Store this
   - **Client Secret**: Store this (keep private!)

## Part 2: Supabase Configuration

### Step 1: Enable Google Provider in Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Navigate to your project > **Authentication** > **Providers**
3. Find **Google** in the list
4. Toggle it **ON**
5. Paste your Google credentials:
   - **Client ID**: Your Google Client ID from above
   - **Client Secret**: Your Google Client Secret from above
6. Click **SAVE**

### Step 2: Verify Callback URL

- Supabase shows your callback URL: `https://<your-project>.supabase.co/auth/v1/callback`
- This must match the redirect URI added in Google Cloud Console

## Part 3: Environment Variables

Update `.env.local` (and `.env.example` for reference):

```env
# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # http://localhost:3000 for dev, your domain for prod
```

## Part 4: Frontend Implementation

The OAuth button is already wired up. To use Google:

```tsx
import OAuthLoginButton from '@/components/auth/OAuthLoginButton';

export default function LoginPage() {
  return (
    <>
      {/* Existing email/password form if any */}

      <OAuthLoginButton
        provider="google"
        logo="/img/google-logo.svg" // or use an image URL
        buttonText="Continue with Google"
      />
    </>
  );
}
```

The flow works as follows:

1. User clicks "Continue with Google"
2. Frontend calls `login('google')` which triggers `supabase.auth.signInWithOAuth()`
3. User is redirected to Google's consent screen
4. After consent, Google redirects back to Supabase callback URL
5. Supabase creates/updates user session
6. User is redirected to `/profile` (configured in login action)

## Part 5: Testing

### Local Testing

1. Set `NEXT_PUBLIC_BASE_URL=http://localhost:3000`
2. Ensure `http://localhost:3000/auth/v1/callback` is in Google OAuth redirect URIs
3. Run `npm run dev`
4. Navigate to `/login` and test the Google OAuth button

### Production Testing

1. Add your production domain to:
   - Google Cloud Console authorized origins
   - Google Cloud Console redirect URIs
   - `.env` on production server
2. Set `NEXT_PUBLIC_BASE_URL=https://yourdomain.com`
3. Deploy and test

## Part 6: Optional - Custom Callback Handling

If you want to run custom logic after OAuth login (e.g., update user profile, log analytics), create an optional callback route:

**src/app/auth/callback/route.ts:**

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');

  // Supabase handles the exchange automatically, so this route
  // is optional. If you need custom logic, you can add it here.

  // Redirect to profile after callback
  return NextResponse.redirect(`${request.nextUrl.origin}/profile`);
}
```

However, Supabase handles the callback internally, so this is optional unless you need custom post-auth logic.

## Troubleshooting

| Issue                          | Solution                                                                   |
| ------------------------------ | -------------------------------------------------------------------------- |
| "Redirect URI mismatch"        | Check that callback URL in Google Console matches Supabase setting exactly |
| User not redirected to profile | Verify `NEXT_PUBLIC_BASE_URL` is set correctly in `.env.local`             |
| "OAuth client not found"       | Ensure Google provider is enabled in Supabase > Auth > Providers           |
| User stays on login page       | Clear cookies and try again; check browser console for errors              |

## Security Notes

- **Client Secret** should never be exposed in frontend code; Supabase handles it securely on the backend
- **NEXT_PUBLIC_BASE_URL** is safe to be public (it's just your domain)
- Always use HTTPS in production for OAuth
- Test in an incognito window to avoid cache issues
