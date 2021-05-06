import { Message as DiscordMessage, Client as DiscordClient } from 'discord.js'
import { Message as MessageEvent } from '../../src/events'
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
  } as unknown) as DiscordMessage

  const client = new DiscordClient()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should pong when pinged', async () => {
    message.content = `${prefix}ping`
    await MessageEvent.handler(client, message)
    expect(message.channel.send).toHaveBeenCalledWith('Pong.')
  })

  it('should do nothing when not pinged', async () => {
    message.content = 'hello'
    await MessageEvent.handler(client, message)
    expect(message.channel.send).not.toHaveBeenCalledWith('Pong.')
  })
})
