import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabaseServer";
import * as Papa from "papaparse";
import { validateRows, FastMathRowSchema, resolveKidvisionIds } from "@/utils/validators";

// Server Supabase client (service key)
const supabase = createSupabaseServerClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 1️⃣ Read CSV
    const csvText = await file.text();
    const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });

    const rawRows = parsed.data as unknown[];
    const { validRows: rows, errors } = validateRows(
      FastMathRowSchema,
      rawRows,
    );

    if (!rows.length) {
      return NextResponse.json({ error: "CSV is empty" }, { status: 400 });
    }

    // 2️⃣ Resolve kidvision_id (if rows have student_id, look up kidvision_id)
    const { resolved: resolvedRows, errors: resolutionErrors } = await resolveKidvisionIds(rows, supabase);

    if (resolutionErrors.length > 0) {
      console.error("Student ID resolution errors:", resolutionErrors);
    }

    const payload = resolvedRows.map((row) => ({
      kidvision_id: row.kidvision_id,
      assessment_type: "FAST_MATH",
      subject: "math",
      scale_score: Number(row.scale_score ?? null),
      level: row.level ?? null,
      date_given: row.date_given || null,
    }));

    if (!payload.length) {
      return NextResponse.json(
        { error: "No valid rows found", details: resolutionErrors },
        { status: 400 },
      );
    }

    // 3️⃣ Delete existing FAST Math for these kidvision_ids
    const kidvisionIds = payload.map((p) => p.kidvision_id);

    await supabase
      .from("student_assessments")
      .delete()
      .eq("assessment_type", "FAST_MATH")
      .in("kidvision_id", kidvisionIds);

    // 4️⃣ Insert fresh records
    const { error: insertError } = await supabase
      .from("student_assessments")
      .insert(payload);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        {
          error: insertError.message || "Insert failed",
          details: insertError,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      inserted: payload.length,
      invalidRows: errors.length,
      errors: errors.slice(0, 10),
    });
  } catch (err: unknown) {
    console.error("FAST Math upload failed:", err);
    const msg = err instanceof Error ? err.message : String(err);
    const details =
      err && typeof err === "object"
        ? JSON.parse(
            JSON.stringify(err, Object.getOwnPropertyNames(err as object)),
          )
        : undefined;
    return NextResponse.json(
      { error: msg ?? "Upload failed", details },
      { status: 500 },
    );
  }
}
