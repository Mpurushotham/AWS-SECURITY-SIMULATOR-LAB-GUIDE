import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY || '';

let client: GoogleGenAI | null = null;

if (apiKey) {
  client = new GoogleGenAI({ apiKey });
}

export const createChatSession = (): Chat | null => {
  if (!client) return null;

  return client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are an expert AWS Security Architect and Educator. 
      Your goal is to help users understand complex AWS security concepts, from IAM policies to automated incident response.
      Be concise, technical, and practical. 
      Use analogies where helpful (e.g., comparing Security Groups to firewalls at a door).
      If asked about code, provide secure examples in Terraform, Python (Boto3), or JSON (IAM Policies).`,
    },
  });
};
