const { SlashCommandBuilder } = require('@discordjs/builders');
const { adminRole, reportsChannel, ticketsCategory } = require('./commands_config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove-user')
		.setDescription('Remove um user do ticket onde é chamado.')
        .addUserOption(option =>
			option
				.setName('user')
				.setDescription('Pessoa a remover')
				.setRequired(true),
			),
	async execute(interaction) {
        // ids das roles de staff
		if (!interaction.member.roles.cache.has(adminRole)) {
			return interaction.reply({
				content: 'Não tens permissões para usar este comando.',
				ephemeral: true,
			});
		}
        if (interaction.channel.parentId != ticketsCategory ||
            interaction.channel.id == reportsChannel) {
            return interaction.reply({
                content: 'Isto não é um ticket!',
                ephemeral: true,
           });
        }
        // ids das roles de staff
        if (interaction.guild.members.cache.get(interaction.options.getUser('user').id).roles.cache.has(adminRole)) {
            return interaction.reply({
                content: 'Não podes remover staff!',
                ephemeral: true,
           });
        }
        await interaction.channel.permissionOverwrites.edit(interaction.options.getUser('user'), {
			VIEW_CHANNEL: false,
		});
		return interaction.reply({
			content: 'User removido!',
			ephemeral: true,
		});
	},
};