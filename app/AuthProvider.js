"use client";

import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

export default function AuthProvider({ children }) {
  if (!domain || !clientId) {
    console.error("Auth0 domain and clientId are missing!");
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: typeof window !== "undefined" ? window.location.origin : "",
      }}
    >
      {children}
    </Auth0Provider>
  );
}
