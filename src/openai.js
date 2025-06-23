const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function getTranslation(text, language) {
    const response = await openai.responses.create({
        model: 'gpt-4o',
        instructions: 'You translate text to another language while localizing it for cultural context. Make the answer no more than 1800 characters long.',
        input: `Translate "${text}" to ${language}.`,
    });

    return response.output_text;
}

async function answer(prompt) {
    const response = await openai.responses.create({
        model: 'gpt-4o',
        instructions: 'Reply the messages in a sarcastic and humorous way, while being informative with funny references. Make the answer no more than 1800 characters long.',
        input: prompt,
    });

    return response.output_text;
}

module.exports = { getTranslation, answer };
