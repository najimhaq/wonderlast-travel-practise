// frontend/src/lib/auth-client.js
import { jwtClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL, // Ensure this matches your backend URL
  plugins: [jwtClient()],
});

// Export individual functions for easier use
export const { signUp, login, signOut, useSession } = authClient;
