import { Message } from 'discord.js'
import { messageHandler } from '../../src/handlers'
import { prefix } from '../../src/config/env'

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

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should pong when pinged', async () => {
    message.content = `${prefix}ping`
    await messageHandler(message)
    expect(message.channel.send).toHaveBeenCalledWith('Pong.')
  })

  it('should do nothing when not pinged', async () => {
    message.content = 'hello'
    await messageHandler(message)
    expect(message.channel.send).not.toHaveBeenCalledWith('Pong.')
  })
})
