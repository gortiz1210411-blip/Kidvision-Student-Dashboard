"use client";

import { useState } from "react";

export default function UploadRosterTile() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  async function handleUpload() {
    setStatus("");

    if (!file) {
      setStatus("Please select a roster CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-roster", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(`Error: ${data.error}`);
        return;
      }

      setStatus(
        `Roster Upload Complete!
Added: ${data.added}
Updated: ${data.updated}
Skipped: ${data.skipped}
Total Rows: ${data.total_students}`,
      );
    } catch (err) {
      console.error(err);
      setStatus("Upload failed.");
    }
  }

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-200">
      <h2 className="text-xl font-semibold mb-3">Upload Student Roster</h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="mb-3"
      />

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Upload Roster CSV
      </button>

      {status && (
        <p className="mt-3 text-sm text-gray-700 whitespace-pre-line">
          {status}
        </p>
      )}
    </div>
  );
}
