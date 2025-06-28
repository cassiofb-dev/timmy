const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function getTranslation(text, language) {
    const response = await openai.responses.create({
        model: 'gpt-4.1-mini',
        instructions: 'You translate text to another language while localizing it for cultural context. Make the answer no more than 1800 characters long.',
        input: `Translate "${text}" to ${language}.`,
    });

    return response.output_text;
}

async function answer(prompt) {
    const response = await openai.responses.create({
        model: 'gpt-4.1-mini',
        instructions: 'Reply the messages in a objective and short manner. Make the answer no more than 1800 characters long.',
        input: prompt,
        tools: [
            {
                type: "web_search_preview",
            }
        ]
    });

    return response.output_text;
}

module.exports = { getTranslation, answer };
