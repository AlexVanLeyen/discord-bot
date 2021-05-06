import { Message } from 'discord.js'
import { prefix } from '@/config/env'

export const messageHandler = async (message: Message) => {
  if (message.content === `${prefix}ping`) {
    message.channel.send('Pong.')
  }
}
