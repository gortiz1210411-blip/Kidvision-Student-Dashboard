import { createSupabaseServerClient } from "@/utils/supabaseServer";

export default async function StudentMathDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createSupabaseServerClient();

  const student_id = params.id;

  // Get student profile
  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("student_id", student_id)
    .single();

  // Get all math assessments
  const { data: assessments } = await supabase
    .from("student_assessments")
    .select("*")
    .eq("student_id", student_id)
    .eq("subject", "math")
    .order("date_given", { ascending: true });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>
        {student.first_name} {student.last_name} – Math Progress
      </h1>

      <h2 style={{ marginTop: "2rem" }}>📘 FAST Math History</h2>
      {renderTable(
        (assessments ?? []).filter((a) => a.assessment_type === "fast"),
      )}

      <h2 style={{ marginTop: "2rem" }}>⭐ STAR Math History</h2>
      {renderTable(
        (assessments ?? []).filter((a) => a.assessment_type === "star"),
      )}

      <h2 style={{ marginTop: "2rem" }}>📝 Unit Tests</h2>
      {renderTable(
        (assessments ?? []).filter((a) => a.assessment_type === "unit"),
      )}

      <h2 style={{ marginTop: "2rem" }}>📒 Quizzes</h2>
      {renderTable(
        (assessments ?? []).filter((a) => a.assessment_type === "quiz"),
      )}
    </div>
  );
}

function renderTable(rows: Record<string, unknown>[]) {
  if (!rows || rows.length === 0) return <p>No records found.</p>;

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "0.5rem",
      }}
    >
      <thead>
        <tr>
          {Object.keys(rows[0]).map((col) => (
            <th
              key={col}
              style={{ borderBottom: "1px solid #ccc", padding: "8px" }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {Object.values(r).map((v: unknown, idx: number) => (
              <td
                key={idx}
                style={{ padding: "6px", borderBottom: "1px solid #f0f0f0" }}
              >
                {typeof v === "object" && v !== null
                  ? JSON.stringify(v)
                  : String(v ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
