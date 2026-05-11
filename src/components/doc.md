We are building a hackathon project called Pocketcare AI.

Context:
Pocketcare AI is an offline-first medicine literacy Progressive Web App powered by Gemma 4. It helps people in low-connectivity areas understand medicine labels, side effects, warnings, and safe usage notes in simple language.

This is for the Gemma 4 Good Hackathon, so the implementation must clearly show real Gemma 4 usage, agentic retrieval, safety-first medical guardrails, and a functional demo. Do not build a generic chatbot wrapper.

Important product rule:
This app is NOT a doctor. It must not diagnose, prescribe, or provide unsafe dosage advice. It should provide educational medicine guidance only and recommend consulting a doctor/pharmacist when needed.

Current state:
The mobile-first UI already exists. The home screen has medicine input, question input, explanation style, and mock result behavior.

Current task:
Replace the mock result flow with the first real backend architecture:

1. Curated medicine database
2. Retrieval layer
3. Safety gate
4. Gemma 4 client
5. AI orchestrator
6. API route
7. Connect UI to the API
8. Render real structured results

Do not implement notifications yet.
Do not implement OCR/image upload yet.
Do not implement authentication.
Do not implement a full database.
Do not implement service worker/offline cache yet.

Tech stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Existing mobile-first UI
- Local JSON medicine database
- Gemma 4 through Ollama for local development
- Structured JSON response validation

Create this folder structure if it does not already exist:

src/
app/
api/
assistant/
route.ts
ai/
gemma.client.ts
orchestrator.ts
prompts.ts
schemas.ts
data/
medicines/
paracetamol.json
ibuprofen.json
amoxicillin.json
cetirizine.json
omeprazole.json
lib/
retrieval.ts
safety.ts

1. Medicine database

Create 5 medicine JSON files inside src/data/medicines:

- paracetamol.json
- ibuprofen.json
- amoxicillin.json
- cetirizine.json
- omeprazole.json

Each medicine should follow this shape:

{
"id": "paracetamol",
"name": "Paracetamol",
"aliases": ["Panadol", "Acetaminophen"],
"category": "Pain and fever",
"commonUses": [],
"generalWarnings": [],
"possibleSideEffects": [],
"dangerSigns": [],
"safeUsageNotes": [],
"askProfessionalIf": []
}

Important:
Do not include exact dosage recommendations unless framed as “follow label/pharmacist/doctor instructions.”
Keep data safe and educational.

2. Retrieval layer

Create src/lib/retrieval.ts.

It should:

- import all medicine JSON files
- expose getAllMedicines()
- expose searchMedicineDatabase(query: string)
- search by medicine name and aliases
- normalize casing and spacing
- support searches like:
  - Panadol → Paracetamol
  - Acetaminophen → Paracetamol
  - Advil/Nurofen → Ibuprofen

If medicine is not found, return null.

3. Safety gate

Create src/lib/safety.ts.

It should detect emergency or dangerous phrases before calling Gemma.

Emergency keywords should include:

- overdose
- too many tablets
- can't breathe
- cannot breathe
- difficulty breathing
- fainted
- unconscious
- swollen face
- swollen throat
- severe reaction
- poison
- blood
- chest pain

Expose checkEmergencyRisk(message: string), returning:

{
isEmergency: boolean,
reason: string | null
}

If emergency risk is detected, the API should bypass Gemma and return an urgent safety response.

4. Output schema

Create src/ai/schemas.ts.

Use Zod if already installed. If not installed, either install zod or write a TypeScript type and safe parser.

Preferred schema:

{
answer: string,
commonUses: string[],
keyWarnings: string[],
possibleSideEffects: string[],
safeUsageNotes: string[],
whenToSeekHelp: string[],
reminderSuggestion: {
canCreateReminder: boolean,
reason: string,
suggestedLabel: string
},
confidence: "low" | "medium" | "high",
disclaimer: string
}

5. Prompt builder

Create src/ai/prompts.ts.

Create buildMedicinePrompt({ medicine, question, language }).

The prompt must instruct Gemma:

- You are MedGuide AI, an educational medicine literacy assistant.
- Use only the provided medicine context.
- Do not invent facts.
- Do not diagnose.
- Do not prescribe.
- Do not give exact dosage unless the user provided the dosage from a medicine label, doctor, or pharmacist.
- If unsure, advise the user to ask a doctor or pharmacist.
- Return only valid JSON.
- No markdown.
- No extra text outside JSON.

The prompt should include:

- retrieved medicine context
- user question
- selected explanation style
- exact required JSON output shape

6. Gemma client

Create src/ai/gemma.client.ts.

Use Ollama local API for now:

Base URL:
process.env.OLLAMA_BASE_URL || "http://localhost:11434"

Model:
process.env.GEMMA_MODEL || "gemma4:e2b"

Create function:

askGemmaForMedicineGuidance({
medicine,
question,
language
})

It should:

- build the prompt
- call Ollama /api/generate
- use stream: false
- request JSON format if supported
- parse the JSON response
- validate/normalize the response
- throw a clean error if Gemma fails

Use this endpoint:

POST http://localhost:11434/api/generate

Body shape:

{
"model": "gemma4:e2b",
"prompt": "...",
"stream": false,
"format": "json"
}

7. AI orchestrator

Create src/ai/orchestrator.ts.

Create function:

runMedicineAssistant({
medicineName,
question,
language
})

Flow:

1. Combine medicineName + question and run checkEmergencyRisk()
2. If emergency, return:
   {
   type: "emergency",
   message: "This may be urgent. Please contact emergency medical services or a licensed healthcare professional immediately.",
   reason,
   disclaimer
   }

3. Search local medicine database.
4. If medicine not found, return:
   {
   type: "not_found",
   message: "I could not find verified offline information for this medicine yet. Please check the spelling or ask a pharmacist.",
   disclaimer
   }

5. If medicine found, call askGemmaForMedicineGuidance().
6. Return:
   {
   type: "medicine_guidance",
   medicineId,
   medicineName,
   source: "curated_offline_medicine_database",
   guidance
   }

7. API route

Create src/app/api/assistant/route.ts.

It should accept POST body:

{
medicineName: string,
question: string,
language: string
}

Validate required fields.
Call runMedicineAssistant().
Return JSON.
Handle errors cleanly.

9. Connect existing UI

Update the existing home screen so the “Ask MedGuide” button calls /api/assistant.

UI states:

- idle
- loading
- success
- emergency
- not_found
- error

Behavior:

- Disable button while loading.
- Show loading text like “Checking offline medicine knowledge…”
- Render emergency response differently using a danger/warning card.
- Render not_found response using a neutral card.
- Render medicine_guidance response in the existing result card.

10. Environment variables

Add or document .env.local:

GEMMA_MODEL=gemma4:e2b
OLLAMA_BASE_URL=http://localhost:11434

Also add a safe fallback error message if Ollama is not running:

“Gemma local runtime is not available. Start Ollama and run the Gemma 4 model, then try again.”

11. Hackathon documentation comments

Add useful comments in the code explaining:

- retrieval layer = agentic retrieval / grounding
- safety gate = medical safety guardrail
- Gemma client = local model reasoning layer
- orchestrator = decision layer between user intent, retrieval, safety, and model response

12. Do not overbuild

Only implement this first real flow:

User enters:
Medicine: Panadol
Question: Can I take this after food?
Language: Simple English

System:
Panadol maps to Paracetamol.
Emergency check passes.
Gemma receives Paracetamol context.
Gemma returns structured guidance.
UI renders the result.

Acceptance criteria:

- The app no longer uses mock result data.
- The UI calls /api/assistant.
- Panadol returns Paracetamol guidance.
- Unknown medicine returns not_found.
- Emergency phrases bypass Gemma.
- Code is clean and hackathon-writeup friendly.
