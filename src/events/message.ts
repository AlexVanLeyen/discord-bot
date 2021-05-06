import { Message, Collection, Client } from 'discord.js'
import { prefix } from '@/config/env'
import { Ping, CommandInterface } from '@/commands'

const commands = new Collection<string, CommandInterface>()
commands.set('ping', Ping)

export const handler = async (client: Client, message: Message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return
  const args = message.content.slice(prefix.length).trim().split((/ +/g))
  const command = (args.shift() ?? '').toLowerCase()
  const cmd = commands.get(command)
  if (!cmd) return
  cmd.run(client, message, args)
}
