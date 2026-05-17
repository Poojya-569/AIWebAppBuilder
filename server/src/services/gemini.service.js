import { generateContent } from '../config/gemini.config.js';

export const askGemini = async (prompt) => {
  try {
    const response = await generateContent(prompt);

    if (!response) {
      console.log("Gemini returned empty response");
      return null;
    }

    return response;
  } catch (error) {
    console.log("Gemini failed:", error.message);

    // ✅ DO NOT THROW
    return null;
  }
};