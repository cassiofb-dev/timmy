const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with the Websocket heartbeat.'),
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {
    interaction.reply(`Websocket heartbeat: ${interaction.client.ws.ping}ms.`);
  },
};
