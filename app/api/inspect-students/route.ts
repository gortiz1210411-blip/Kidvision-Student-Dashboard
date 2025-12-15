import { createSupabaseServerClient } from "@/utils/supabaseServer";

export async function GET() {
  try {
    const client = createSupabaseServerClient();
    
    // Get the first student record to see what columns exist
    const { data, error } = await client
      .from("students")
      .select("*")
      .limit(1);

    if (error) {
      return Response.json(
        { error: error.message, details: error },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return Response.json(
        { message: "No students in database", schema: "unknown" },
        { status: 200 }
      );
    }

    // Return the first record to show available columns
    return Response.json(
      {
        message: "Sample student record",
        record: data[0],
        columns: Object.keys(data[0]),
      },
      { status: 200 }
    );
  } catch (err: any) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
