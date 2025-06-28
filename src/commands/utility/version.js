const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('version')
    .setDescription('Shows the current commit of the bot.'),
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {
    try {
      const { execSync } = require('child_process');
      const commit = execSync('git rev-parse HEAD').toString().trim();
      await interaction.reply(`Current commit: \`${commit}\``);
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while fetching the version.');
    }
  },
};
