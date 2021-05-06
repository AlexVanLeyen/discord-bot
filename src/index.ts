#!/usr/bin/env node
import { Client } from 'discord.js'
import dotenv from 'dotenv'
import Loader from '@/utils/loader'

dotenv.config()
const client = new Client()
const path = `${process.cwd()}/dist`
const token = process.env.DISCORD_BOT_TOKEN

const start = async () => {
  if (!token) {
    throw new Error('Missing required DISCORD_BOT_TOKEN')
  }
  const loader = new Loader({ path, client })
  await loader.load()
  client.login(token)
}

start()
