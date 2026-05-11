We are building a hackathon project called MedGuide AI.

Context:
MedGuide AI is an offline-first Progressive Web App powered by Gemma 4. It helps users in low-connectivity areas understand medicine information in simple language, access safety warnings, and later set medicine reminders. The product is NOT a doctor, does NOT diagnose, and must avoid giving unsafe dosage advice. Gemma 4 will later be used as the reasoning layer with retrieval from a curated offline medicine database.

Current task:
Build only the first landing/search page UI in my existing Next.js App Router project.

Tech stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Mobile-first layout
- Clean healthcare-style UI
- No backend yet
- No Gemma integration yet
- No database yet

Page goal:
Create a polished mobile-first homepage that feels like an installable health assistant PWA.

Page content:
1. Header section:
   - App name: MedGuide AI
   - Small badge: Offline-first medicine assistant
   - Short tagline: Understand medicine instructions safely, even with poor internet.

2. Hero section:
   - Title: Your pocket medicine guide, powered by Gemma 4
   - Subtitle explaining that the app helps users understand medicine labels, warnings, side effects, and safe usage notes in simple language.
   - Add a small disclaimer: Educational support only. Not a replacement for a doctor or pharmacist.

3. Main assistant card:
   - Input for medicine name
     Placeholder: e.g. Panadol, Ibuprofen, Amoxicillin
   - Textarea for user question
     Placeholder: e.g. Can I take this after food?
   - Select/dropdown for explanation style:
     - Simple English
     - Explain like I’m 12
     - Pidgin English
   - Primary button: Ask MedGuide
   - For now, when the button is clicked, show a mock result card instead of calling an API.

4. Mock result card:
   Show a realistic sample response for Paracetamol/Panadol:
   - Simple explanation
   - Common uses
   - Key warnings
   - When to seek help
   - Reminder suggestion
   - Safety disclaimer

5. Trust/feature cards:
   Add three small cards:
   - Offline-ready
   - Safety-first
   - Gemma 4 powered

6. Future sections:
   Add a small “Coming next” section with:
   - Medicine reminders
   - Offline saved guidance
   - Medicine label photo scan

Design direction:
- Mobile-first, but responsive on desktop.
- Soft medical/healthcare feel.
- Use rounded cards, subtle borders, clean spacing.
- Use calm colors: white, slate, emerald/teal accents.
- Avoid looking like a generic AI chatbot.
- Make it feel like a serious health utility.
- Keep the UI simple and demo-friendly.
- Use accessible labels and good contrast.

Implementation requirements:
- Replace the default content in `src/app/page.tsx`.
- Use a client component if needed for state and mock result toggling.
- Do not create backend files yet.
- Do not install new packages unless necessary.
- Use plain Tailwind CSS only.
- Keep code clean and easy to extend.
- Add comments where future Gemma API integration will happen.

Important:
The final UI should make it obvious that this project is a PWA medicine assistant that will later use:
- curated offline medicine database
- Gemma 4 reasoning
- safe structured responses
- offline cache
- PWA notifications