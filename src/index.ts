#!/usr/bin/env node
import { Client } from 'discord.js'
import { messageHandler } from '@/handlers'
import dotenv from 'dotenv'

dotenv.config()
const client = new Client()
const log = console
const token = process.env.DISCORD_BOT_TOKEN

if (!token) {
  throw new Error('Missing required DISCORD_BOT_TOKEN')
}

client.once('ready', () => {
  log.info('Congratulations, your Discord bot has been successfully initialized!')
})

client.on('message', messageHandler)

client.login(token)
