const { Client, CommandInteraction } = require('discord.js');
const AFK = require('$Schemas/AFK');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = {
    name: 'test',
    description: 'test',
    category: 'test',
    /**
    * @param {CommandInteraction} interaction
    * @param {Client} client
    */
    async execute(interaction, client) {
        try {
            const doc = yaml.load(fs.readFileSync('src/Configurations/config.yml', 'utf-8'));
            console.log(doc);
            console.log(doc.test);
        } catch(e) {
            console.log(e);
        }
    }
}