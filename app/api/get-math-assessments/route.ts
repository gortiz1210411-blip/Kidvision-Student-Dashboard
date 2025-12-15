import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabaseServer";

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("student_assessments")
      .select("*")
      .eq("subject", "math")
      .order("date_given", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
