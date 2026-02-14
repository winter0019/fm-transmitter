
import { GoogleGenAI } from "@google/genai";

// Safe access to API key to prevent crashes in raw browser environments
const getApiKey = () => {
  try {
    return process.env.API_KEY || "";
  } catch (e) {
    return "";
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export async function getAssistantResponse(prompt: string, context: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `
          You are the OmniControl Smart Assistant. You help users manage their home devices and FM transmitter.
          Available devices: ${context}.
          You can suggest "scenes" (e.g. "Movie Night" = TV ON, DStv ON, AC 22°C).
          You can suggest clear FM frequencies based on typical urban interference (usually 88.3, 91.5, 107.9).
          Keep responses concise and helpful.
        `,
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the smart hub right now.";
  }
}
