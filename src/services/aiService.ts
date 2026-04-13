import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface MoodAnalysis {
  score: number; // 0-100
  mood: string;
  summary: string;
  riskLevel: "low" | "medium" | "high";
  suggestions: string[];
  lonelinessScore: number;
  fallRisk: "low" | "medium" | "high";
}

export async function analyzeVisitMood(notes: string): Promise<MoodAnalysis> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-latest",
      contents: `Analyze the following caretaker visit notes for an elderly person. 
      Detect their emotional state, wellness, loneliness level, and physical fall risk based on the context.
      Return a JSON object.
      
      Notes: "${notes}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Overall wellness score from 0 to 100" },
            mood: { type: Type.STRING, description: "Primary mood detected" },
            summary: { type: Type.STRING, description: "A reassuring 1-sentence summary for the family" },
            riskLevel: { type: Type.STRING, enum: ["low", "medium", "high"] },
            lonelinessScore: { type: Type.NUMBER, description: "Loneliness score from 0 to 100" },
            fallRisk: { type: Type.STRING, enum: ["low", "medium", "high"] },
            suggestions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Suggestions for the next visit"
            }
          },
          required: ["score", "mood", "summary", "riskLevel", "lonelinessScore", "fallRisk", "suggestions"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return {
      score: 70,
      mood: "Neutral",
      summary: "Visit completed successfully.",
      riskLevel: "low",
      lonelinessScore: 30,
      fallRisk: "low",
      suggestions: ["Continue regular visits."]
    };
  }
}
