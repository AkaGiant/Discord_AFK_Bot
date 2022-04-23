require('dotenv').config();
require('reflect-metadata');


const mongoose = require('mongoose');

const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32767 })

const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);

const Ascii = require('ascii-table');
const AFK = require('$Schemas/AFK');

client.commands = new Collection();
client.afkusers = new Collection();

["Events", "Commands"].forEach(handler => {
    require(`./src/Handlers/${handler}`)(client, PG, Ascii)
});

(async () => {

    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console.log('Unable to connect to MongoDB Database.\nError: ' + err)
    })

    const afkUsers = await AFK.find();
    afkUsers.forEach((config) => { if (config.isAfk) client.afkusers.set(`${config.userId}-${config.guildId}`, config.toObject({ versionKey: false }))
    })
    
    client.login(process.env.BOT_TOKEN);
})();