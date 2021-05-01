require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;

if (!token) {
    throw new Error('Missing required DISCORD_BOT_TOKEN');
}

client.once('ready', () => {
   console.log('Congratulations, your Discord bot has been successfully initialized!');
});

client.on("message", message => {
    if (message.content === "!ping") {
        message.channel.send("Pong.")
    }
});

client.login(token);
