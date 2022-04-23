const { Schema, model} = require('mongoose');

module.exports = model("AFK", new Schema({
    userId: String,
    guildId: String,
    status: String,
    time: String,
    isAfk: Boolean
}));