import { Message, Client } from 'discord.js'
import { prefix } from '@/config/env'
import { CommandCollection } from '@/types'

export const handler = (client: Client, commands: CommandCollection, message: Message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return
  const args = message.content.slice(prefix.length).trim().split((/ +/g))
  const command = (args.shift() ?? '').toLowerCase()
  const cmd = commands.get(command)
  if (!cmd) return
  cmd.run(client, message, args)
}
