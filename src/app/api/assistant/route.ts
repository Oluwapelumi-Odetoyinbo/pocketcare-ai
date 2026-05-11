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
        { type: "error", message: "Gemma API is unavailable right now. Please check your API key or try again." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { medicineName, question, language } = body;

    if (!medicineName || question === undefined) {
      return NextResponse.json(
        { type: "error", message: "Medicine name and question are required." },
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
