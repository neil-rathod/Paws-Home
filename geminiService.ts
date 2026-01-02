
import { GoogleGenAI, Type } from "@google/genai";
import { Dog } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDogMatch = async (userProfile: string, dogs: Dog[]) => {
  const dogListSummary = dogs.map(d => ({
    id: d.id,
    name: d.name,
    breed: d.breed,
    energyLevel: d.energyLevel,
    size: d.size,
    compatibility: d.compatibility
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      You are a specialized dog matching expert. 
      The user describes their lifestyle as: "${userProfile}".
      
      Analyze these available dogs: ${JSON.stringify(dogListSummary)}.
      
      Select the TOP 1 best matching dog and provide a warm, empathetic reasoning why they are the perfect companion.
      
      Return the result in JSON format.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dogId: { type: Type.STRING, description: "The ID of the best matching dog" },
          reasoning: { type: Type.STRING, description: "Why this dog fits the user's lifestyle" }
        },
        required: ["dogId", "reasoning"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
};
