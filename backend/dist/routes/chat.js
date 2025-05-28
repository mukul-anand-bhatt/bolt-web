"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gemini_1 = require("../services/gemini");
const prompts_1 = require("../prompts");
const router = (0, express_1.Router)();
// Chat endpoint
router.post('/', async (req, res) => {
    const userMessages = req.body.messages;
    try {
        const messages = [
            {
                role: 'user',
                content: `${(0, prompts_1.getSystemPrompt)()}\n\n` + userMessages.map((m) => m.content).join('\n'),
            },
        ];
        const output = await (0, gemini_1.callGemini)(messages, 8000);
        console.log(output);
        const response = {
            response: output,
        };
        res.json(response);
    }
    catch (error) {
        const errorResponse = { error: 'Failed to process chat request' };
        res.status(500).json(errorResponse);
    }
});
exports.default = router;
