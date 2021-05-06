import { Message as DiscordMessage, Client as DiscordClient } from 'discord.js'
import * as Ping from './ping'

interface CommandInterface {
  run(client: DiscordClient, message: DiscordMessage, args?: unknown[]): void
}

export {
  Ping,
  CommandInterface
}
