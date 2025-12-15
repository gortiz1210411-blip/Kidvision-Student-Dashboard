import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabaseServer";

const supabase = createSupabaseServerClient();

// GET /api/student/[id]/assessments
export async function GET(req, { params }) {
  const student_id = params.id;

  const { data, error } = await supabase
    .from("student_assessments")
    .select("*")
    .eq("student_id", student_id)
    .order("date_given", { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ assessments: data });
}

// POST /api/student/[id]/assessments
export async function POST(req, { params }) {
  const student_id = params.id;
  const body = await req.json();

  const { assessment_type, score, date_given } = body;

  const { data, error } = await supabase
    .from("student_assessments")
    .insert([
      {
        student_id,
        assessment_type,
        score,
        date_given: date_given || new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ inserted: data[0] });
}
