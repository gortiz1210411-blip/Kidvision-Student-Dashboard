"use client";

import { useEffect, useState } from "react";

type MathRow = {
  date_given?: string;
  assessment_type?: string;
  test_name?: string;
  scale_score?: number | string | null;
  percentile_rank?: number | string | null;
  level?: string | null;
};

export default function MathAssessmentsPage() {
  const [rows, setRows] = useState<MathRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/get-math-assessments");

        if (!res.ok) {
          setError("API error: " + res.status);
          return;
        }

        const json = await res.json();
        // API returns `{ data: [...] }` from server routes — normalize to an array
        const list = Array.isArray(json) ? json : json?.data ?? [];
        setRows(list);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
      }
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading…</p>;

  if (error)
    return (
      <div style={{ padding: 20, color: "red" }}>
        ❌ Error loading math assessments:
        <br />
        {error}
      </div>
    );

  return (
    <div style={{ padding: 20 }}>
      <h1
        style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}
      >
        📊 Math Assessments
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ccc",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Date</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Type</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Test Name</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>
              Scale Score
            </th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Percentile</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Level</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} style={{ padding: 20, textAlign: "center" }}>
                No math assessments found.
              </td>
            </tr>
          )}

          {rows.map((r, i: number) => {
            const row = r as MathRow;
            return (
              <tr key={i}>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {row.date_given}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {row.assessment_type}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {row.test_name}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {row.scale_score}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {row.percentile_rank}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {row.level}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
