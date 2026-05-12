import { checkEmergencyRisk } from "../lib/safety";
import { askGemmaDirectMedicine } from "./gemma.client";
import { AssistantResponse, DEFAULT_DISCLAIMER } from "./schemas";

interface RunAssistantArgs {
  medicineName: string;
  question: string;
  language: string;
}

/**
 * AI Orchestrator: decision layer between user intent, safety, and model response.
 * Safety pre-check prevents high-risk cases from being treated as normal medicine guidance.
 * Structured JSON makes the output explainable and UI-friendly.
 * Gemma 4 is the primary reasoning layer.
 */
export async function runMedicineAssistant({
  medicineName,
  question,
  language,
}: RunAssistantArgs): Promise<AssistantResponse> {
  const combinedText = `${medicineName} ${question}`;
  
  // Safety Check
  const safetyCheck = checkEmergencyRisk(combinedText);
  
  if (safetyCheck.isEmergency) {
    return {
      type: "emergency",
      message: "This may be urgent. Please contact emergency medical services or a licensed healthcare professional immediately.",
      reason: safetyCheck.reason,
      disclaimer: DEFAULT_DISCLAIMER,
    };
  }

  try {
    const guidance = await askGemmaDirectMedicine({
      medicineName,
      question: question || medicineName || "Tell me about this medicine.",
      language,
    });

    return {
      type: "gemma_direct_guidance",
      medicineName,
      source: "gemma4_hosted_gemini_api",
      guidance,
    };
  } catch (error) {
    console.error("Orchestrator error:", error);
    return {
      type: "error",
      message: error instanceof Error ? error.message : "An unexpected error occurred while consulting Gemma.",
    };
  }
}
