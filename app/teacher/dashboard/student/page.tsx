"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#DDEEFF] px-4 py-8 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-[#2D7FFF] flex items-center justify-center bg-white">
              <span className="text-sm font-bold text-[#2D7FFF]">KV</span>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-semibold text-[#1A2740]">
                KidVision
              </div>
              <div className="text-xs tracking-[0.2em] text-[#A0A7B4]">
                STUDENT DASHBOARD
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-[#A0A7B4]">Welcome back,</div>
            <div className="text-lg font-semibold text-[#1A2740]">
              Billy Student
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="space-y-6">
          {/* 4 Tiles */}
          <section className="grid gap-4 sm:grid-cols-2">
            {/* Math */}
            <Link href="/dashboard/math" className="block">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-transform">
                <div className="px-4 py-2 bg-gradient-to-r from-[#2D7FFF] to-[#5AB4FF] text-white text-sm font-semibold">
                  Math
                </div>
                <div className="px-4 py-5">
                  <div className="text-3xl font-semibold text-[#1A2740]">
                    85
                  </div>
                  <div className="text-xs text-[#A0A7B4] mt-1">
                    Latest score • FAST PM2
                  </div>
                </div>
              </div>
            </Link>

            {/* Reading */}
            <Link href="/dashboard/reading" className="block">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-transform">
                <div className="px-4 py-2 bg-gradient-to-r from-[#FF6FB5] to-[#FF9CCF] text-white text-sm font-semibold">
                  Reading
                </div>
                <div className="px-4 py-5">
                  <div className="text-3xl font-semibold text-[#1A2740]">
                    92
                  </div>
                  <div className="text-xs text-[#A0A7B4] mt-1">
                    Latest score • STAR Winter
                  </div>
                </div>
              </div>
            </Link>

            {/* Science */}
            <Link href="/dashboard/science" className="block">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-transform">
                <div className="px-4 py-2 bg-gradient-to-r from-[#5AB4FF] to-[#C9A8FF] text-white text-sm font-semibold">
                  Science
                </div>
                <div className="px-4 py-5">
                  <div className="text-3xl font-semibold text-[#1A2740]">
                    78
                  </div>
                  <div className="text-xs text-[#A0A7B4] mt-1">
                    Unit average • Forms of Energy
                  </div>
                </div>
              </div>
            </Link>

            {/* Habits */}
            <Link href="/dashboard/habits" className="block">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-transform">
                <div className="px-4 py-2 bg-gradient-to-r from-[#7EE7D9] to-[#C9A8FF] text-white text-sm font-semibold">
                  Habits
                </div>
                <div className="px-4 py-5">
                  <div className="text-lg font-semibold text-[#1A2740]">
                    On time: <span className="text-2xl">45</span>/50 days
                  </div>
                  <div className="text-xs text-[#A0A7B4] mt-1">
                    Positive points: 27
                  </div>
                </div>
              </div>
            </Link>
          </section>

          {/* Goals & Upcoming row */}
          <section className="grid gap-4 md:grid-cols-2">
            {/* Goals */}
            <div className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-[#1A2740]">Goals</h2>
                <span className="text-xs text-[#A0A7B4]">4 of 6 completed</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E0E5F2] overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-[#2D7FFF] to-[#FF6FB5]" />
              </div>
              <p className="mt-3 text-xs text-[#A0A7B4]">
                You’re close to reaching your math growth goal.
              </p>
            </div>

            {/* Upcoming */}
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h2 className="text-sm font-semibold text-[#1A2740] mb-3">
                Upcoming
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#1A2740]">
                      Math Quiz – Fractions
                    </div>
                    <div className="text-xs text-[#A0A7B4]">
                      Friday • Goal: 80%+
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#E0E5F2]" />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#1A2740]">
                      Science Quiz – Energy
                    </div>
                    <div className="text-xs text-[#A0A7B4]">
                      Monday • Goal: 80%+
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#E0E5F2]" />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#1A2740]">
                      STAR Reading – Winter
                    </div>
                    <div className="text-xs text-[#A0A7B4]">
                      In 3 days • Show your growth!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
