#!/usr/bin/env node
import { Client } from 'discord.js'
import Bot, { BotConfig } from '@/bot'
import dotenv from 'dotenv'

dotenv.config()
const client = new Client()
const path = process.env.DISCORD_BOT_DIST_PATH ?? `${process.cwd()}/dist`
const token = process.env.DISCORD_BOT_TOKEN ?? ''
if (!token) {
  throw new Error('Missing required DISCORD_BOT_TOKEN')
}

const config: BotConfig = { client, path, token }
const bot = new Bot(config)

bot.run()
