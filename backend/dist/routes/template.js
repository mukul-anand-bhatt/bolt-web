"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gemini_1 = require("../services/gemini");
const prompts_1 = require("../prompts");
const node_1 = require("../defaults/node");
const react_1 = require("../defaults/react");
const router = (0, express_1.Router)();
// Detect if project is node or react
router.post('/', async (req, res) => {
    const prompt = req.body.prompt;
    const messages = [
        {
            role: 'user',
            content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra\n\n" + prompt,
        },
    ];
    try {
        const answer = (await (0, gemini_1.callGemini)(messages, 200)).trim().toLowerCase();
        if (answer === 'react') {
            const response = {
                prompts: [
                    prompts_1.BASE_PROMPT,
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n `,
                ],
                uiPrompts: [react_1.basePrompt],
            };
            res.json(response);
        }
        else if (answer === 'node') {
            const response = {
                prompts: [
                    prompts_1.BASE_PROMPT,
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${node_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
                ],
                uiPrompts: [node_1.basePrompt],
            };
            res.json(response);
        }
        else {
            const errorResponse = { error: "You can't access this" };
            res.status(403).json(errorResponse);
        }
    }
    catch (error) {
        const errorResponse = { error: 'Failed to process template request' };
        res.status(500).json(errorResponse);
    }
});
exports.default = router;
