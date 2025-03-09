const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const { answer } = require('../../openai');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('answer')
    .setDescription('Get an answer from OpenAI')
    .addStringOption(option =>
      option.setName('prompt')
        .setDescription('The prompt to pass to OpenAI')
        .setRequired(true)),
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {
    try {
      const prompt = interaction.options.getString('prompt');
      await interaction.reply('Thinking...');
      const response = await answer(prompt);
      await interaction.followUp(response);
    } catch (error) {
      console.error(error);
    }
  },
};
