export type MessageRole = "user" | "assistant" | "system";

export interface LLMMessage {
  role: MessageRole;
  content: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  isHistorical?: boolean;
}
