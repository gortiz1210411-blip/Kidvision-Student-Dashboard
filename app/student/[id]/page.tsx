"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function StudentDashboard() {
  const params = useParams();
  const studentId = params.id as string;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DDEEFF] to-[#E8D4FF]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#E0E5F2]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border-3 border-[#2D7FFF] flex items-center justify-center">
              <span className="text-lg font-bold text-[#2D7FFF]">KV</span>
            </div>
            <span className="text-xl font-semibold text-[#1A2740]">KidVision</span>
          </div>
          <Link
            href="/"
            className="text-sm text-[#A0A7B4] hover:text-[#2D7FFF] transition-colors"
          >
            Log Out
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-[#1A2740] mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-[#A0A7B4]">
            Track your assessments, view your progress, and stay on top of your learning goals.
          </p>
        </div>

        {/* Assessment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Math Assessments Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#2D7FFF]/10 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <h2 className="text-xl font-bold text-[#1A2740]">Math</h2>
            </div>
            <p className="text-sm text-[#A0A7B4] mb-4">
              View your FAST, STAR, and other math assessments.
            </p>
            <Link
              href={`/student/${studentId}/math`}
              className="inline-block px-4 py-2 rounded-lg bg-[#2D7FFF] text-white text-sm font-semibold hover:bg-[#2362C5] transition-colors"
            >
              View Math →
            </Link>
          </div>

          {/* Reading Assessments Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF6FB5]/10 flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <h2 className="text-xl font-bold text-[#1A2740]">Reading</h2>
            </div>
            <p className="text-sm text-[#A0A7B4] mb-4">
              View your reading assessments and progress.
            </p>
            <Link
              href={`/student/${studentId}/reading`}
              className="inline-block px-4 py-2 rounded-lg bg-[#FF6FB5] text-white text-sm font-semibold hover:bg-[#E85BA0] transition-colors"
            >
              View Reading →
            </Link>
          </div>

          {/* Science Assessments Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                <span className="text-2xl">🔬</span>
              </div>
              <h2 className="text-xl font-bold text-[#1A2740]">Science</h2>
            </div>
            <p className="text-sm text-[#A0A7B4] mb-4">
              Track your science assessments and results.
            </p>
            <Link
              href={`/student/${studentId}/science`}
              className="inline-block px-4 py-2 rounded-lg bg-[#10B981] text-white text-sm font-semibold hover:bg-[#059669] transition-colors"
            >
              View Science →
            </Link>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <h2 className="text-xl font-bold text-[#1A2740]">Profile</h2>
            </div>
            <p className="text-sm text-[#A0A7B4] mb-4">
              View your profile information and settings.
            </p>
            <Link
              href={`/student/${studentId}/profile`}
              className="inline-block px-4 py-2 rounded-lg bg-[#F59E0B] text-white text-sm font-semibold hover:bg-[#D97706] transition-colors"
            >
              View Profile →
            </Link>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-lg font-bold text-[#1A2740] mb-6">Your Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2D7FFF] mb-2">—</div>
              <p className="text-sm text-[#A0A7B4]">Math Assessments</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF6FB5] mb-2">—</div>
              <p className="text-sm text-[#A0A7B4]">Reading Assessments</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#10B981] mb-2">—</div>
              <p className="text-sm text-[#A0A7B4]">Science Assessments</p>
            </div>
          </div>
          <p className="text-xs text-[#A0A7B4] text-center mt-6">
            Assessment data will appear here when your teacher uploads results.
          </p>
        </div>
      </main>
    </div>
  );
}
