import { GoogleGenAI } from "@google/genai";
import { buildDirectGemmaMedicinePrompt } from "./prompts";
import { MedicineGuidanceSchema, MedicineGuidance } from "./schemas";

/**
 * Gemma client using Google GenAI SDK.
 * This represents the hosted model reasoning layer.
 * Hosted Gemma through Gemini API is used so the public demo works without local model setup.
 */
export async function askGemmaDirectMedicine({
  medicineName,
  question,
  language,
}: {
  medicineName: string;
  question: string;
  language: string;
}): Promise<MedicineGuidance> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = process.env.GEMMA_MODEL || "gemma-4-26b-a4b-it";
  
  const prompt = buildDirectGemmaMedicinePrompt({ medicineName, question, language });

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    let text = response.text || "";
    
    // Strip markdown JSON fences if present
    text = text.replace(/^```(json)?\s*/i, "").replace(/\s*```$/i, "");

    const parsed = JSON.parse(text);
    return MedicineGuidanceSchema.parse(parsed);
  } catch (error) {
    console.error("Gemma client error:", error);
    throw new Error("Gemma returned invalid JSON formatting or API error.");
  }
}
