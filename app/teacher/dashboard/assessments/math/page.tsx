"use client";

import { useEffect, useState } from "react";

type AssessmentSmall = {
  id?: string;
  date_given?: string;
  assessment_type?: string;
  test_name?: string;
  scale_score?: number | string | null;
  percentile_rank?: number | string | null;
  level?: string | null;
};

export default function MathAssessmentsPage() {
  const [assessments, setAssessments] = useState<AssessmentSmall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/get-math-assessments");
        const json = await res.json();

        if (json.error) {
          setError(json.error);
          console.error("Load error:", json.error);
        } else {
          setAssessments(json.data || json || []);
          setError(null);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        console.error(err);
      }
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading math assessments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "#fee",
          border: "1px solid #f88",
          borderRadius: "4px",
          color: "#c33",
        }}
      >
        <h2>⚠️ Error loading assessments</h2>
        <p>{error}</p>
        <p style={{ fontSize: "12px", marginTop: "8px" }}>
          Check that your Supabase credentials are set in .env.local
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>
        📊 Math Assessments
      </h1>

      {assessments.length === 0 && (
        <p style={{ color: "#666" }}>No math assessments found.</p>
      )}

      {assessments.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 20,
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Type</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Test Name
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Scale Score
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Percentile Rank
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Level
              </th>
            </tr>
          </thead>

          <tbody>
            {assessments.map((a, i) => (
              <tr
                key={a.id || i}
                style={{
                  backgroundColor: i % 2 === 0 ? "#fafafa" : "white",
                }}
              >
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {a.date_given}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {a.assessment_type}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {a.test_name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {a.scale_score ?? "-"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {a.percentile_rank ?? "-"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {a.level ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
