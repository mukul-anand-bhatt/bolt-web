"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testGemini = testGemini;
const gemini_1 = require("./gemini");
async function testGemini() {
    const messages = [
        {
            role: 'user',
            content: 'Hello, how are you?'
        }
    ];
    const response = await (0, gemini_1.callGemini)(messages, 100);
    console.log(response);
}
testGemini();
