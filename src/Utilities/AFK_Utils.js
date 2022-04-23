const AFK = require('$Schemas/AFK');
const { GuildMember } = require('discord.js');

/**
 * Returns weather or not the provided user is AFK
 * @param {Client} client 
 * @param {GuildMember} user 
 * @param {Guild} guild 
 * @returns {boolean} true/false
 */
function getAfk(client, user, guild) {
    return client.afkusers.get(`${user.id}-${guild.id}`);
}

/**
 * Sets a provided user's afk status.
 * @param {Client} client 
 * @param {GuildMember} user 
 * @param {Guild} guild 
 * @param {String} status
 * @param {String} time
 */
function setAfk(client, user, guild, status, time ) {

    AFK.findOne({ userId: user.id, guildId: guild.id },
        async (err, data) => {
            if (err) throw err;
            data = new AFK({
                userId: user.id,
                guildId: guild.id,
                status,
                time: parseInt(time / 1000),
                isAfk: true
            });
            await data.save();
            client.afkusers.set(`${user.id}-${guild.id}`, data);
        })
}

/**
 * Removes a provided user's afk status.
 * @param {CLient} client The bot client
 * @param {GuildMember} user The user to remove from afk
 * @param {Guild} guild The users guild
 */
async function removeAfk(client, user, guild) {
    client.afkusers.delete(`${user.id}-${guild.id}`);
    await AFK.deleteOne({ userId: user.id, guildId: guild.id });
}

module.exports = {
    getAfk,
    removeAfk,
    setAfk
}
