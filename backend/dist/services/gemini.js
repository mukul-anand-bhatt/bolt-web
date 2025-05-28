"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callGemini = callGemini;
const generative_ai_1 = require("@google/generative-ai");
const environment_1 = require("../config/environment");
const genAI = new generative_ai_1.GoogleGenerativeAI(environment_1.config.geminiApiKey);
async function callGemini(messages, maxTokens) {
    const model = genAI.getGenerativeModel({ model: environment_1.config.geminiModel });
    const chat = model.startChat({
        history: messages.slice(0, -1).map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.content }],
        })),
    });
    const userMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(userMessage);
    console.log(result);
    const response = await result.response;
    console.log(response);
    return response.text();
}
