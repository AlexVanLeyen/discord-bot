import { Client as DiscordClient, Message as DiscordMessage, Collection as DiscordCollection } from 'discord.js'

interface CommandInterface {
  run(client: DiscordClient, message: DiscordMessage, args?: unknown[]): void
}

interface EventInterface {
  handler(client: DiscordClient, ...args): void
}

type CommandCollection = DiscordCollection<string, CommandInterface>
type EventCollection = DiscordCollection<string, EventInterface>
