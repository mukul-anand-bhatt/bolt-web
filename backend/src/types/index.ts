/**
 * Message type for AI communication
 */
export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Chat request type
 */
export interface ChatRequest {
  messages: AIMessage[];
  temperature?: number;
  maxTokens?: number;
}

/**
 * Chat response type
 */
export interface ChatResponse {
  response: string;
}

/**
 * Error response type
 */
export interface ErrorResponse {
  error: string;
  details?: string;  // Optional for more detailed error reporting
}

/**
 * Template response type
 */
export interface TemplateResponse {
  prompts: string[];
  uiPrompts: string[];
}