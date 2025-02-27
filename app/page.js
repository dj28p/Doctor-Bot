"use client";

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { loginWithRedirect, loginWithPopup, isAuthenticated, isLoading, user } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/chat");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="flex h-screen">
      <div className="bg-black w-1/2 h-full flex flex-col justify-between p-16">
        <div className="HelveticaN text-8xl font-bold">
          <div>Doctor</div>
          <div className="text-right">[-&gt;]Bot</div>
        </div>
        <div className="text-sm font-extralight">
          Doctor Bot is a chatbot that provides health and wellness advice based on your queries. 
          Please note that these are just recommendations, and you should visit a local doctor for serious concerns.
        </div>
      </div>

      <div className="text-black bg-white w-1/2 h-full flex items-center justify-center">
        <div className="backdrop-blur-lg bg-white/50 p-8 rounded-2xl shadow-xl w-96 text-center font-[Helvetica] border border-gray-200">
          <h2 className="text-3xl font-extrabold tracking-wide mb-2">
            {isAuthenticated ? `Welcome, ${user?.name}` : "Welcome Back"}
          </h2>
          <p className="text-gray-500 mb-6">
            {isAuthenticated ? "You are logged in!" : "Sign in to continue"}
          </p>

          {isLoading && <p>Checking authentication...</p>}

          {!isAuthenticated && !isLoading && (
            <div className="space-y-4">
              <button
                onClick={() => loginWithRedirect()} 
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all shadow-md"
              >
                Sign In
              </button>

              <button
                onClick={() => loginWithPopup()} 
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition shadow-sm"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span>Sign in with Google</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}