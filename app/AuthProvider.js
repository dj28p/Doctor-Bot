"use client";

import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-s28syiljrdegt0jo.us.auth0.com";
const clientId = "HEZb2a97B6d5s1Djd26G8d9wBYjIcvck";

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