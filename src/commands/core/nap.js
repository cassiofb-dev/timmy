const { EmbedBuilder, SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nap')
    .setDescription('Non Aggression Pact Rules'),
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {
    const title = 'Non Aggression Pact Rules';

    let description = 'The Non Aggression Pact is a set of rules that all members of the server must follow.\n';
    description += 'This rules applies to all top 15 alliances and the ones that helped in the server wars:'

    const rules = [
      { name: '1. NO ATTACK ON BASES', punishment: 'PUNISHMENT: XXX' },
      { name: '2. NO ATTACK ON RSS TILES', punishment: 'PUNISHMENT: XXX' },
      { name: '3. NO ATTACK ON TRUCKS', punishment: 'PUNISHMENT: XXX' },
      { name: '4. NO ATTACK ON TRAINS', punishment: 'PUNISHMENT: XXX' },
      { name: '5. NO RAIDS ON TASKS', punishment: 'PUNISHMENT: ONE BASE ATTACK' },
    ];

    let footer = '-# 𑁢 Only you can see this • [Review](<https://discord.com/vanityurl/dotcom/steakpants/flour/flower/index11.html>)';

    let markdownMessage = `## ${title}`;
    markdownMessage += `\n${description}`;
    markdownMessage += '\n\n';
    rules.forEach(rule => {
      markdownMessage += `${rule.name}`;
      // markdownMessage += ` - ${rule.punishment}`;
      markdownMessage += '\n';
    });
    markdownMessage += `\n${footer}`;

    await interaction.reply({
      content: markdownMessage,
    });
  },
};
