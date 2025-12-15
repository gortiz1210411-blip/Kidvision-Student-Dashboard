"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";

export default function UploadMathAssessments() {
  const [file, setFile] = useState<File | null>(null);
  const [assessmentType, setAssessmentType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [insertedCount, setInsertedCount] = useState(0);

  const endpoints: Record<string, string> = {
    fast: "/api/upload/fast-math",
    star: "/api/upload/star-math",
    unit: "/api/upload/unit-math",
    quiz: "/api/upload/quiz-math",
  };

  // ---------------------------
  // HANDLE FILE SELECTION
  // ---------------------------
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] || null);
  }

  // ---------------------------
  // UPLOAD CSV FILE
  // ---------------------------
  async function handleUpload() {
    if (!file) {
      setMessage("❌ Please choose a CSV file.");
      return;
    }

    if (!assessmentType) {
      setMessage("❌ Please select an assessment type.");
      return;
    }

    const endpoint = endpoints[assessmentType];
    if (!endpoint) {
      setMessage("❌ Invalid assessment type.");
      return;
    }

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage("❌ Upload failed: " + data.error);
        setSuccess(false);
      } else {
        setInsertedCount(data.inserted || 0);
        setMessage(
          `✅ Successfully uploaded ${data.inserted || 0} records! ${
            data.invalidRows ? `(${data.invalidRows} rows had errors)` : ""
          }`
        );
        setSuccess(true);
        setFile(null);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setMessage("❌ Error: " + msg);
      setSuccess(false);
    }

    setLoading(false);
  }

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div style={{ padding: "20px" }}>
      <h1>📤 Upload Math Assessments</h1>

      <p>Select assessment type and upload a CSV file.</p>

      {/* ASSESSMENT TYPE DROPDOWN */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontWeight: "bold" }}>Assessment Type:</label>
        <br />
        <select
          value={assessmentType}
          onChange={(e) => setAssessmentType(e.target.value)}
          style={{
            marginTop: "0.5rem",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">-- Select Type --</option>
          <option value="fast">📘 FAST Math</option>
          <option value="star">⭐ STAR Math</option>
          <option value="unit">📝 Unit Test (Math)</option>
          <option value="quiz">📒 Quiz (Math)</option>
        </select>
      </div>

      {/* FILE INPUT */}
      <input type="file" accept=".csv" onChange={handleFileChange} />

      {/* UPLOAD BUTTON */}
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "10px 20px",
          background: "#1976D2",
          color: "white",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Uploading..." : "Upload CSV"}
      </button>

      {message && (
        <div
          style={{
            marginTop: "1rem",
            padding: "12px",
            borderRadius: "4px",
            fontWeight: "bold",
            backgroundColor: success ? "#efe" : "#fee",
            border: `1px solid ${success ? "#8f8" : "#f88"}`,
            color: success ? "#080" : "#c33",
          }}
        >
          {message}

          {success && (
            <div style={{ marginTop: "12px" }}>
              <Link
                href="/teacher/dashboard/assessments/math"
                style={{
                  display: "inline-block",
                  marginRight: "12px",
                  padding: "8px 16px",
                  backgroundColor: "#1976D2",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                }}
              >
                📊 View All Assessments
              </Link>

              <button
                onClick={() => {
                  setMessage("");
                  setSuccess(false);
                  setAssessmentType("");
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#666",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Upload More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
