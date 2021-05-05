#!/usr/bin/env node
import { Client, Message } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()
const client = new Client()
const log = console
const token = process.env.DISCORD_BOT_TOKEN
const prefix = process.env.BOT_COMMAND_PREFIX ?? '!'

if (!token) {
  throw new Error('Missing required DISCORD_BOT_TOKEN')
}

client.once('ready', () => {
  log.info('Congratulations, your Discord bot has been successfully initialized!')
})

client.on('message', (message: Message) => {
  if (message.content === `${prefix}ping`) {
    message.channel.send('Pong.')
  }
})

client.login(token)