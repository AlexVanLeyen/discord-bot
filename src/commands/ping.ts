import { Message, Client } from 'discord.js'

export const run = (client: Client, message: Message) => {
  message.channel.send('Pong.')
}
