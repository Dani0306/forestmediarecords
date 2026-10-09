/** One turn of the conversation. `role` decides the side and the label. */
export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

/** idle: waiting for the user · thinking: waiting for the AI · error: the last request failed. */
export type ChatStatus = "idle" | "thinking" | "error";
