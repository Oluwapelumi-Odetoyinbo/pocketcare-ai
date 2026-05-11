# 💊 Pocketcare AI

**Pocketcare AI** is a premium, AI-driven medical guidance platform designed to bridge the gap between complex pharmaceutical information and patient understanding. Built for the **Gemma 4 Good Hackathon**, it leverages the power of Gemma 4 to provide clear, simplified, and safe medication literacy.

![Pocketcare AI Preview](https://res.cloudinary.com/dokbfxcxv/image/upload/v1778456767/11165c00-3068-45d1-9f23-ce0e5a97f9a2_ndvyt2.png)

## ✨ Features

- 📱 **Installable PWA**: A seamless experience that lives on your home screen or desktop.
- 🤖 **Powered by Gemma 4**: Utilizing the `gemma-4-26b-a4b-it` model via Google Gemini API for high-quality medical reasoning.
- 🎨 **Premium MedTech UI**: A clean, calming aesthetic using a curated palette (Teal, Soft Mint, Slate) and modern typography (Raleway & Geist).
- ⚡ **Animated Interaction**: Staggered entrance animations and dynamic hero text for a "living" interface.
- 🛡️ **Safety-First Architecture**: 
  - **Confidence Badges**: Real-time confidence scoring for every AI response.
  - **Urgent Warnings**: Immediate emergency detection and escalation.
  - **Clear Disclaimers**: Integrated medical disclaimers on every result.
- 🔍 **Medicine Insights**: Detailed breakdowns of uses, side effects, warnings, and interactions.

## 🚀 Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescript.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Model**: [Gemma 4](https://ai.google.dev/gemma) (via Google Gemini API)
- **Icons/Graphics**: Custom SVG Leaf Logo & Cloudinary-hosted assets
- **Deployment**: Optimized for Vercel

## 🛠️ Local Setup

Pocketcare AI requires a Google Gemini API key to function.

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/pocketcare-ai.git
cd pocketcare-ai
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure Environment Variables**:
Create a `.env.local` file in the root directory and add your Gemini API key:
```env
GEMINI_API_KEY=your_api_key_here
```
*Get your key at [Google AI Studio](https://aistudio.google.com/)*.

4. **Run the development server**:
```bash
npm run dev
```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## ⚠️ Medical Disclaimer

**Pocketcare AI is for educational medicine literacy ONLY.**
- It is **NOT** a doctor.
- It does **NOT** diagnose or prescribe.
- It is **NOT** a substitute for professional medical advice, diagnosis, or treatment.
- **ALWAYS** consult a qualified healthcare provider for any medical decisions.
- **In an emergency, contact your local emergency services (e.g., 911) immediately.**

## 📄 License

This project is built as part of the Gemma 4 Good Hackathon. See `LICENSE` for more details (if applicable).
