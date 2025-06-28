const { SlashCommandBuilder, ChatInputCommandInteraction, MessageFlags } = require('discord.js');
const { answer } = require('../../openai');
const { truncateString } = require('../../utils/functions.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lwq')
    .setDescription('Last War Question - Get an answer from OpenAI')
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

      await interaction.reply({
        content: 'Thinking...',
        flags: MessageFlags.Ephemeral,
      });

      const response = await answer(`search the websites about the game 'Last War' to answer: ${prompt}`);

      await interaction.followUp({
        content: truncateString(response, 2000),
        flags: [
          MessageFlags.Ephemeral,
          MessageFlags.SuppressEmbeds,
        ],
      });
    } catch (error) {
      console.error(error);
    }
  },
};
