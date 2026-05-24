// frontend/src/lib/auth-client.js
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL, // Ensure this matches your backend URL
});

// Export individual functions for easier use
export const { signUp, login, signOut, useSession } = authClient;
