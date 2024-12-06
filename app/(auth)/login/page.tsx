"use client";
import React from "react";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { title } from "process";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      toast({
        title: "Error",
        description: "Wrong Credentials"
      })
    } else {
      router.push("/"); // Redirect to the homepage after successful login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className=" p-8 rounded-lg w-full">
        {/* Sign In Header */}
        <h1 className="text-8xl font-bold text-center mb-3 tracking-tight">
          SIGN IN
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-black font-semibold underline"
          >
            Sign Up
          </a>
        </p>

        {/* Sign-In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {/* Email Input */}
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-4 text-white ${
              loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
            }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
