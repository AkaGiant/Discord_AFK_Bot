// Discord Imports
const { removeAfk, getAfk } = require('$AFKUtils')
const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    // Event Settings
    name: 'messageCreate',
    /**
     * @param {Message} message 
     */
    async execute(message, client) {
        if (message.author.bot || !getAfk(client, message.author, message.guild)) return;

        await removeAfk(client, message.author, message.guild);

        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor({ name: `You are no longer AFK`, iconURL: message.member.user.avatarURL({ dynamic: true})})

        message.reply({ embeds: [embed]})
    }
}