import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabaseServer";

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("students")
      .select("student_id, first_name, last_name, kidvision_id, class_code")
      .order("first_name");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ students: data });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
