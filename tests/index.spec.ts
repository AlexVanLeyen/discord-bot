import { Message } from 'discord.js'
import { messageHandler } from '../src/handlers'

describe('Message Handler', () => {
  const message = ({
    channel: {
      send: jest.fn()
    },
    content: '',
    author: {
      bot: false
    }
  } as unknown) as Message

  const prefix = process.env.BOT_COMMAND_PREFIX ?? '!'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should pong when pinged', async () => {
    message.content = `${prefix}ping`
    await messageHandler(message)
    expect(message.channel.send).toHaveBeenCalledWith('Pong.')
  })
})
