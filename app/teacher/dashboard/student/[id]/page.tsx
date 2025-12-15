import { supabase } from "@/lib/supabaseClient";

type Assessment = {
  id?: string;
  name?: string;
  type?: string;
  score?: number | null;
  max_score?: number | null;
  date?: string;
};

export default async function StudentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Fetch student info
  const { data: student, error: studentError } = await supabase
    .from("students")
    .select("*")
    .eq("student_id", id)
    .single();

  if (studentError || !student) {
    return <div className="p-6 text-red-500">Student not found.</div>;
  }

  // Fetch assessments (FAST, STAR, math, reading, etc.)
  const { data: assessments } = await supabase
    .from("assessments")
    .select("*")
    .eq("student_id", id)
    .order("date", { ascending: false });

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          {student.first_name} {student.last_name}
        </h1>
        <p className="text-gray-700 text-lg mt-1">
          Class: <span className="font-semibold">{student.class_code}</span>
        </p>
        <p className="text-gray-700 text-lg">
          KidVision ID:{" "}
          <span className="font-semibold">{student.kidvision_id}</span>
        </p>
      </div>

      {/* Assessment Section */}
      <div>
        <h2 className="text-2xl font-semibold">Assessment History</h2>

        {(assessments?.length ?? 0) === 0 ? (
          <p className="text-gray-600 mt-2">No assessments found.</p>
        ) : (
          <table className="w-full border-collapse mt-4">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-2">Name</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Score</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>

            <tbody>
              {assessments!.map((a: Assessment) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="border p-2">{a.name}</td>
                  <td className="border p-2">{a.type}</td>
                  <td className="border p-2">
                    {a.score}
                    {a.max_score ? ` / ${a.max_score}` : ""}
                  </td>
                  <td className="border p-2">
                    {a.date ? new Date(a.date).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
