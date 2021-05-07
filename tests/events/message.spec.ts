import { Message as DiscordMessage, Client as DiscordClient, Collection as DiscordCollection } from 'discord.js'
import { handler } from '@/events/message'
import { prefix } from '@/config/env'

describe('Message Handler', () => {
  const pong = 'Pong.'
  const message = ({
    channel: {
      send: jest.fn()
    },
    content: '',
    author: {
      bot: false
    }
  } as unknown) as DiscordMessage
  const client = ({} as unknown) as DiscordClient
  const commands = new DiscordCollection<string, any>()
  commands.set('ping', {
    run: jest.fn((client: DiscordClient, message: DiscordMessage) => {
      message.channel.send(pong)
    })
  })

  beforeEach(() => {
    jest.clearAllMocks()
    message.content = ''
    message.author.bot = false
  })

  it('should pong when pinged', () => {
    message.content = `${prefix}ping`
    handler(client, commands, message)
    expect(message.channel.send).toHaveBeenCalledWith(pong)
  })

  it('should do nothing when not pinged', () => {
    message.content = 'hello'
    handler(client, commands, message)
    expect(message.channel.send).not.toHaveBeenCalledWith(pong)
  })

  it('should do nothing when author is bot', () => {
    message.author.bot = true
    handler(client, commands, message)
    expect(message.channel.send).not.toHaveBeenCalledWith(pong)
  })

  it('should do nothing if given an unrecognized command', () => {
    message.content = `${prefix}`
    handler(client, commands, message)
    expect(message.channel.send).not.toHaveBeenCalledWith(pong)
  })
})
