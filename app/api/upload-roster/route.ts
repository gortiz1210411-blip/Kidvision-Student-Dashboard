import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabaseServer";
import * as XLSX from "xlsx";
import { validateRows, RosterRowSchema } from "@/utils/validators";

// Temporary – will later use teacher auth
const CURRENT_TEACHER_ID = "da6fcad1-aad3-41d5-ad61-b6a54a777904";

export async function POST(req: Request) {
  try {
    const supabase = createSupabaseServerClient();

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // --- Read Excel file ---
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    // Convert first sheet → JSON
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const raw = XLSX.utils.sheet_to_json(sheet);
    const { validRows: rows, errors } = validateRows(
      RosterRowSchema,
      raw as unknown[],
    );

    if (!rows.length) {
      return NextResponse.json(
        { error: "File contains no rows" },
        { status: 400 },
      );
    }

    const insertData = rows.map((row) => ({
      first_name: row.first_name || null,
      last_name: row.last_name || null,
      class_code: row.class_code || null,
      student_pin: row.student_pin ? String(row.student_pin) : null,
      teacher_id: CURRENT_TEACHER_ID,
      kidvision_id: row.kidvision_id || null,
    }));

    const { error } = await supabase.from("students").insert(insertData);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      inserted: insertData.length,
      invalidRows: errors.length,
      errors: errors.slice(0, 10),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
