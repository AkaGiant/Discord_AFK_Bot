const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const { getAfk } = require('$AFKUtils')

module.exports = {
    name: 'check',
    description: 'Check a users afk status',
    category: 'Utility',
    /**
    * @param {CommandInteraction} interaction
    * @param {Client} client
    */
    execute(interaction, client) {
        const { user, guild } = interaction
        
        let isAfk = getAfk(client, user, guild);

        const embed = new MessageEmbed()
        .setColor(isAfk ? 'RED' : 'GREEN')
        .setAuthor({ name: `${user.tag} ${isAfk ? "IS afk" : "is NOT afk"}`, iconURL: user.avatarURL({ dynamic: true})})

        interaction.reply({ embeds: [embed]})
    }
}