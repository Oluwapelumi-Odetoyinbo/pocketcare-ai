/**
 * Safety gate for medical guidance.
 * Detects emergency or high-risk phrases to trigger immediate medical warnings.
 * This represents the medical safety guardrail.
 */

const EMERGENCY_KEYWORDS = [
  "overdose",
  "too many tablets",
  "can't breathe",
  "cannot breathe",
  "difficulty breathing",
  "fainted",
  "unconscious",
  "swollen face",
  "swollen throat",
  "severe reaction",
  "poison",
  "chest pain",
  "seizure",
  "severe bleeding",
];

export interface SafetyCheckResult {
  isEmergency: boolean;
  reason: string | null;
}

export function checkEmergencyRisk(message: string): SafetyCheckResult {
  if (!message) return { isEmergency: false, reason: null };

  const normalizedMessage = message.toLowerCase();

  const foundKeyword = EMERGENCY_KEYWORDS.find((keyword) =>
    normalizedMessage.includes(keyword)
  );

  if (foundKeyword) {
    return {
      isEmergency: true,
      reason: `Detected urgent safety keyword: "${foundKeyword}"`,
    };
  }

  return {
    isEmergency: false,
    reason: null,
  };
}
