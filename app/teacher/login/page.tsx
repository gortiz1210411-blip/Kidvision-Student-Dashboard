"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TeacherLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // TODO: Implement actual Supabase teacher authentication
      // For now, this is a placeholder that redirects to the dashboard
      // In production, use Supabase Auth with email/password
      if (!email || !password) {
        setError("Email and password are required.");
        return;
      }

      // Placeholder: just redirect to dashboard
      // Replace with real Supabase Auth logic
      router.push("/teacher/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A2740] to-[#2D3E50]">
      <div className="bg-white rounded-3xl shadow-2xl px-10 py-8 w-full max-w-md">
        {/* Logo + Title */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-full border-4 border-[#2D7FFF] flex items-center justify-center">
            <span className="text-xl font-bold text-[#2D7FFF]">KV</span>
          </div>
          <div className="text-2xl font-semibold text-[#1A2740]">KidVision</div>
          <div className="text-sm tracking-[0.2em] text-[#A0A7B4]">
            TEACHER DASHBOARD
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-[#A0A7B4] mb-1"
            >
              EMAIL ADDRESS
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 rounded-xl border border-[#E0E5F2] px-3 text-sm outline-none focus:border-[#2D7FFF] focus:ring-2 focus:ring-[#2D7FFF]/25"
              placeholder="teacher@school.edu"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-[#A0A7B4] mb-1"
            >
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 rounded-xl border border-[#E0E5F2] px-3 text-sm outline-none focus:border-[#2D7FFF] focus:ring-2 focus:ring-[#2D7FFF]/25"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full h-11 rounded-xl bg-[#2D7FFF] text-white text-sm font-semibold shadow-md hover:bg-[#2362C5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "LOGGING IN..." : "LOG IN"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 flex flex-col gap-2 text-center text-xs text-[#A0A7B4]">
          <Link
            href="/"
            className="hover:text-[#2D7FFF] transition-colors"
          >
            Student Login
          </Link>
          <p>or</p>
          <button
            type="button"
            className="text-[#2D7FFF] font-semibold hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-[#A0A7B4]">
          Enter your school email and password.
        </p>
      </div>
    </div>
  );
}
