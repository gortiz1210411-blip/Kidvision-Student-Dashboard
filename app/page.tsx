"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginWithClassCode } from "@/app/actions/auth";

export default function Home() {
  const router = useRouter();
  const [classCode, setClassCode] = useState("");
  const [studentPin, setStudentPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await loginWithClassCode(classCode, studentPin);
      if (!result?.success) {
        setError(result?.error || "Login failed. Please try again.");
        return;
      }

      // Navigate to student dashboard
      router.push(`/student/${encodeURIComponent(result.studentId)}`);
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DDEEFF]">
      <div className="bg-white rounded-3xl shadow-xl px-10 py-8 w-full max-w-md">
        {/* Logo + Title */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-full border-4 border-[#2D7FFF] flex items-center justify-center">
            <span className="text-xl font-bold text-[#2D7FFF]">KV</span>
          </div>
          <div className="text-2xl font-semibold text-[#1A2740]">KidVision</div>
          <div className="text-sm tracking-[0.2em] text-[#A0A7B4]">
            STUDENT DASHBOARD
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
              htmlFor="classCode"
              className="block text-xs font-semibold text-[#A0A7B4] mb-1"
            >
              CLASS CODE
            </label>
            <input
              id="classCode"
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              className="w-full h-11 rounded-xl border border-[#E0E5F2] px-3 text-sm outline-none focus:border-[#FF6FB5] focus:ring-2 focus:ring-[#FF6FB5]/25"
              placeholder="ex: ORTIZ5B"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="studentPin"
              className="block text-xs font-semibold text-[#A0A7B4] mb-1"
            >
              STUDENT PIN
            </label>
            <input
              id="studentPin"
              type="password"
              value={studentPin}
              onChange={(e) => setStudentPin(e.target.value)}
              className="w-full h-11 rounded-xl border border-[#E0E5F2] px-3 text-sm outline-none focus:border-[#FF6FB5] focus:ring-2 focus:ring-[#FF6FB5]/25"
              placeholder="4–6 digit PIN"
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

        <p className="mt-4 text-center text-xs text-[#A0A7B4]">
          Use the class code and PIN your teacher gave you.
        </p>

        {/* Teacher Login Link */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[#A0A7B4] mb-2">Are you a teacher?</p>
          <a
            href="/teacher/login"
            className="text-sm text-[#2D7FFF] font-semibold hover:underline transition-colors"
          >
            Teacher Login →
          </a>
        </div>
      </div>
    </div>
  );
}
