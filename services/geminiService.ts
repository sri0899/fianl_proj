
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { CURATED_SCHEMES } from "../constants";
import { Language, UserProfile } from "../types";

export const getGeminiResponse = async (
  prompt: string, 
  language: Language, 
  profile: UserProfile | null,
  attachments?: { data: string; mimeType: string }[]
) => {
  // Fix: Initializing GoogleGenAI using process.env.API_KEY directly as a named parameter
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const profileContext = profile ? `
    User Profile:
    - Name: ${profile.name}
    - Age: ${profile.age}
    - State: ${profile.state}
    - Category: ${profile.category}
    - Income: ${profile.incomeRange}
  ` : "User profile not available.";

  const schemeContext = JSON.stringify(CURATED_SCHEMES);
  
  const systemInstruction = `
    You are the "AI Civil Assistant for India". 
    Goal: Help Indian citizens understand government schemes, certificates, and benefits simply.
    Language: Use ${language === 'en' ? 'English' : language === 'ta' ? 'Tamil' : 'Hindi'}.
    Context:
    ${profileContext}
    Available Curated Schemes: ${schemeContext}
    
    Instructions:
    1. Always prioritize schemes that match the user's age, category, and income.
    2. If a file (Aadhaar/Certificate) is provided, read it and explain its purpose or verify if it meets scheme criteria.
    3. Use a friendly, step-by-step tone.
    4. Important: Never provide legal or official decisions.
    5. Mention official URLs for application.
    6. End with: "This is for awareness only. Verify with official portals."
  `;

  try {
    const parts: any[] = [{ text: prompt }];
    
    if (attachments) {
      attachments.forEach(att => {
        parts.push({
          inlineData: {
            data: att.data,
            mimeType: att.mimeType
          }
        });
      });
    }

    // Fix: Using ai.models.generateContent to query the Gemini model
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction,
        temperature: 0.5,
      },
    });

    // Fix: Accessing .text property directly on GenerateContentResponse
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI Assistant.";
  }
};
