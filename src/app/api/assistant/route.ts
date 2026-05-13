import { NextRequest, NextResponse } from "next/server";
import { runMedicineAssistant } from "../../../ai/orchestrator";

/**
 * POST /api/assistant
 * Accepts: { medicineName, question, language }
 */
export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { type: "error", message: "Sorry, I couldn't look up that medicine right now. Please try again in a moment." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { medicineName, question, language } = body;

    if (!medicineName || question === undefined) {
      return NextResponse.json(
        { type: "error", message: "Please enter a medicine name to search." },
        { status: 400 }
      );
    }

    const result = await runMedicineAssistant({
      medicineName,
      question,
      language: language || "Simple English",
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { type: "error", message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
