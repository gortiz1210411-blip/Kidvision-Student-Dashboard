import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabaseServer";
import * as Papa from "papaparse";
import { validateRows, UnitMathRowSchema, resolveKidvisionIds } from "@/utils/validators";

const supabase = createSupabaseServerClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const csv = await file.text();
    const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
    const rawRows = parsed.data as unknown[];
    const { validRows: rows, errors } = validateRows(
      UnitMathRowSchema,
      rawRows,
    );

    // Resolve kidvision_id from student_id if needed
    const { resolved: resolvedRows, errors: resolutionErrors } = await resolveKidvisionIds(rows, supabase);

    const insertPayload = resolvedRows.map((row) => ({
      kidvision_id: row.kidvision_id,
      assessment_type: "UNIT_MATH",
      subject: "math",
      score: Number(row.score ?? null),
      test_name: row.test_name || "Unit Test",
      date_given: row.date_given || new Date().toISOString().split("T")[0],
    }));

    if (!insertPayload.length) {
      return NextResponse.json(
        { error: "No valid rows found", details: resolutionErrors },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from("student_assessments")
      .insert(insertPayload);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      inserted: insertPayload.length,
      invalidRows: errors.length + resolutionErrors.length,
      errors: errors.slice(0, 10),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
