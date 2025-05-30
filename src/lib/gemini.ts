import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateGeminiResponse(
  text: string,
  systemPrompt: string,
  temperature: number = 0.7
) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: text,
      config: {
        systemInstruction: systemPrompt,
        temperature,
      }
    });

    // According to docs, we can directly access text from response
    const result = response.text;
    
    if (!result) {
      throw new Error("No text generated from the model");
    }

    return {
      success: true,
      content: result,
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      success: false,
      content: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
} 