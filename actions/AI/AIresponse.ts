"use server";

import { ChatMessage } from "@/components/chat/types";
import { client } from "@/openai/client";
import { buildAssistantContext } from "@/lib/assistantContext";

export const generateResponse = async (conversation: ChatMessage[]) => {
  const response = await client.responses.create({
    model: "gpt-5-mini",
    instructions: buildAssistantContext(new Date()),
    input: conversation.slice(-20),
    reasoning: { effort: "minimal" },
    text: { verbosity: "low" },
    max_output_tokens: 1500,
  });

  // "incomplete" (e.g. out of tokens) returns an empty text: treat it as an error
  if (response.status !== "completed" || !response.output_text.trim()) {
    console.error(response.status, response.incomplete_details);
    throw new Error("Error generating response");
  }

  return response.output_text;
};
