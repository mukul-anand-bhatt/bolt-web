import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();


async function main(){
    const client = new Anthropic();

    await client.messages.stream({
        messages: [{role: 'user', content: "Hello"}],
        model: 'claude-opus-4-20250514',
        max_tokens: 1024,
    }).on('text', (text) => {
        console.log(text);
    });

}

main();
