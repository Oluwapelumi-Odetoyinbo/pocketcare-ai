import { z } from "zod";

export const MedicineGuidanceSchema = z.object({
  answer: z.string(),
  likelyMedicineType: z.string(),
  alsoKnownAs: z.array(z.string()).catch([]),
  commonUses: z.array(z.string()),
  keyWarnings: z.array(z.string()),
  possibleSideEffects: z.array(z.string()),
  whatToAvoid: z.array(z.string()),
  whenToSeekHelp: z.array(z.string()),
  reminderSuggestion: z.object({
    canCreateReminder: z.boolean(),
    reason: z.string(),
    suggestedLabel: z.string()
  }),
  riskLevel: z.enum(["low", "medium", "high", "emergency"]).catch("low"),
  confidence: z.enum(["low", "medium", "high"]).catch("medium"),
  safetyDisclaimer: z.string()
});

export type MedicineGuidance = z.infer<typeof MedicineGuidanceSchema>;

export type AssistantResponse =
  | { type: "gemma_direct_guidance"; medicineName: string; source: string; guidance: MedicineGuidance }
  | { type: "emergency"; message: string; reason: string | null; disclaimer: string }
  | { type: "error"; message: string };

export const DEFAULT_DISCLAIMER = "MedGuide AI is for educational support only and is not a replacement for medical care.";
