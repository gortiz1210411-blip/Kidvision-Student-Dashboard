"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Student {
  student_id: string;
  first_name: string;
  last_name: string;
  kidvision_id: string | null;
  class_code: string;
}

export default function StudentRoster() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [filtered, setFiltered] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/get-students");
        const data = await res.json();
        setStudents(data.students);
        setFiltered(data.students);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  // Search filter
  useEffect(() => {
    const q = search.toLowerCase();
    const results = students.filter((s) =>
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(q),
    );
    setFiltered(results);
  }, [search, students]);

  return (
    <div className="mt-10 bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[#1A2740]">Student Roster</h2>

        <input
          type="text"
          placeholder="Search students..."
          className="mt-3 sm:mt-0 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2D7FFF] outline-none w-full sm:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-gray-600 text-sm">Loading students…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => {
            const initials = `${s.first_name[0] ?? ""}${s.last_name[0] ?? ""}`;

            return (
              <div
                key={s.student_id}
                onClick={() =>
                  router.push(`/teacher/dashboard/student/${s.student_id}`)
                }
                className="cursor-pointer bg-[#F7F9FF] hover:bg-[#EEF3FF] transition rounded-2xl p-5 shadow-md border border-gray-100"
              >
                {/* Avatar Circle */}
                <div className="w-14 h-14 flex items-center justify-center text-xl font-bold rounded-full bg-gradient-to-r from-[#2D7FFF] to-[#FF6FB5] text-white shadow-md">
                  {initials}
                </div>

                {/* Student Name */}
                <h3 className="mt-4 text-lg font-semibold text-[#1A2740]">
                  {s.first_name} {s.last_name}
                </h3>

                {/* Class Badge */}
                <div className="mt-1 inline-block px-3 py-1 text-xs rounded-full bg-[#DDEBFF] text-[#2D7FFF] font-medium">
                  Class: {s.class_code}
                </div>

                {/* KidVision ID */}
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-semibold text-[#FF6FB5]">
                    KidVision ID:
                  </span>{" "}
                  {s.kidvision_id ?? "—"}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
