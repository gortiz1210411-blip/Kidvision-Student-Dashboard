"use server";

import { createSupabaseServerClient } from "@/utils/supabaseServer";
import { redirect } from "next/navigation";

export async function loginWithClassCode(
  classCode: string,
  studentPin: string
) {
  try {
    // Validate inputs
    if (!classCode || !studentPin) {
      return {
        success: false,
        error: "Class code and PIN are required.",
      };
    }

    const client = createSupabaseServerClient();

    const normalizedClassCode = classCode.trim();
    const normalizedPin = studentPin.trim();

    // Query students table for matching class code and PIN (case-insensitive on class_code)
    const { data: students, error: queryError } = await client
      .from("students")
      .select("*")
      .ilike("class_code", normalizedClassCode)
      .eq("student_pin", normalizedPin)
      .limit(1);

    if (queryError) {
      console.error("Supabase query error:", queryError);
      return {
        success: false,
        error: "Database error. Please try again.",
      };
    }

    if (!students || students.length === 0) {
      return {
        success: false,
        error: "Invalid class code or PIN. Please try again.",
      };
    }

    const student = students[0] as any;

    // Require kidvision_id for routing/masking; do not expose internal IDs
    if (!student.kidvision_id) {
      return {
        success: false,
        error: "Missing KidVision ID for this student. Please update the roster to include kidvision_id.",
      };
    }

    return {
      success: true,
      studentId: student.kidvision_id,
    };
  } catch (err) {
    console.error("Login error:", err);
    return {
      success: false,
      error: "An error occurred during login. Please try again.",
    };
  }
}
