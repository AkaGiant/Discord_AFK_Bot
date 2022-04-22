require('dotenv').config();
require('reflect-metadata');

const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32767 })

const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);

const Ascii = require('ascii-table');

client.commands = new Collection();

["Events", "Commands"].forEach(handler => {
    require(`./src/Handlers/${handler}`)(client, PG, Ascii)
});


(async () => {
    client.login(process.env.BOT_TOKEN);
})();