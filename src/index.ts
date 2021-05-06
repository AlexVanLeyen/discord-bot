#!/usr/bin/env node
import { Client } from 'discord.js'
import { Message, Ready } from '@/events'
import dotenv from 'dotenv'

dotenv.config()
const client = new Client()
const token = process.env.DISCORD_BOT_TOKEN

if (!token) {
  throw new Error('Missing required DISCORD_BOT_TOKEN')
}

client.once('ready', Ready.handler)
client.on('message', Message.handler.bind(null, client))

client.login(token)
