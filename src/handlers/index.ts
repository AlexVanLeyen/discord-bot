import { Message } from 'discord.js'

const prefix = process.env.BOT_COMMAND_PREFIX ?? '!'

export const messageHandler = async (message: Message) => {
  if (message.content === `${prefix}ping`) {
    message.channel.send('Pong.')
  }
}
