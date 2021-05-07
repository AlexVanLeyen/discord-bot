import { Client as DiscordClient, Message as DiscordMessage, Collection as DiscordCollection } from 'discord.js'

export interface CommandInterface {
  run(client: DiscordClient, message: DiscordMessage, args?: unknown[]): void
}

export interface EventInterface {
  handler(client: DiscordClient, ...args): void
}

export type Collection<V> = DiscordCollection<string, V>
export type Client = DiscordClient
export type CommandCollection = Collection<CommandInterface>
export type EventCollection = Collection<EventInterface>
