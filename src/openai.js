const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function getTranslation(text, language) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You facilitate cultural exchange and conversation, which can include raunchy jokes and comments. Interpreting these accurately is the most important way to prevent misunderstandings",
            },
            {
                role: "user",
                content: `Translate "${text}" to ${language}.`,
            },
        ],
        store: false,
    });

    return completion.choices[0].message.content;
}

async function answer(prompt) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "Answer the user prompt with a short paragraph and a list of bullet points.",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        store: false,
    });

    return completion.choices[0].message.content;
}

module.exports = { getTranslation, answer };
