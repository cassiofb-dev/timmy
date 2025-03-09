const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const { getTranslation } = require('../../openai.js');
const { languages } = require('../../utils/constants.js');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('Translate')
    .setType(ApplicationCommandType.Message),
  /**
   * @param {import('discord.js').MessageContextMenuCommandInteraction} interaction
   */
  async execute(interaction) {
    const message = interaction.targetMessage;
    const languageSelect = new StringSelectMenuBuilder()
      .setCustomId('language')
      .setPlaceholder('Select a language')
      .addOptions(languages.map(language => {
        const [emoji, name] = language.split(' - ');
        const option = new StringSelectMenuOptionBuilder()
          .setLabel(name)
          .setValue(name)
          .setDescription(`Translate to ${name}`)
          .setEmoji(emoji);

        return option;
      }));

    const row = new ActionRowBuilder().addComponents(languageSelect);

    const response = await interaction.reply({
      content: message.content,
      components: [row],
      withResponse: true,
      flags: MessageFlags.Ephemeral,
    });

    const collectorFilter = i => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.resource.message.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });
      const language = confirmation.values[0];
      const translation = await getTranslation(message.content, language);
      await confirmation.update({
        content: translation,
        components: [],
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
    }
  },
};
