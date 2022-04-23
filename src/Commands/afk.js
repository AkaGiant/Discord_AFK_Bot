const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const { setAfk, getAfk, removeAfk } = require('$AFKUtils')
module.exports = {
    name: 'afk',
    description: 'Set your AFK Status!',
    category: 'Utility',
    options: [
        {
            name: "set",
            description: "Set your afk status",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "status",
                    description: "The status to be set",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "return",
            description: "Return from being AFK",
            type: "SUB_COMMAND"
        }
    ],
    /**
    * @param {CommandInteraction} interaction
    * @param {Client} client
    */
    async execute(interaction, client) {
        const { options, user, createdTimestamp, guild } = interaction;
        const TYPE = options.getSubcommand(['set', 'return']);
        const STATUS = options.getString("status");

        const embed = new MessageEmbed()
        embed.setColor('GREEN')

        switch (TYPE) {
            case "set": {
                // If a user is already afk return
                if (getAfk(client, user, guild)) return interaction.reply({ content: "You are already AFK"});
                
                // Else set them as afk
                await setAfk(client, user, guild, STATUS, createdTimestamp);

                embed.setAuthor({ name: `You are now AFK`, iconURL: user.avatarURL({ dynamic: true})})
                embed.setDescription(`**Reason**: ${STATUS}`)


                return interaction.reply({ embeds: [embed]})
            }
            case "return": {
                // If a user is not afk return
                if (!getAfk(client, user, guild)) return interaction.reply({ content: "You aren't AFK"});

                // Else remove them from afk
                await removeAfk(client, user, guild);

                embed.setAuthor({ name: `Welcome back!`, iconURL: user.avatarURL({ dynamic: true})})
                return interaction.reply({ embeds: [embed]});
            }
        }
    }
}
