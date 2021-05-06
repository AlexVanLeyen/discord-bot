import { promises as fs } from 'fs'
import { Client as DiscordClient, Collection as DiscordCollection } from 'discord.js'
import { EventCollection, EventInterface, CommandCollection, CommandInterface } from '@/types'
import { log } from '@/utils/log'

interface loaderOpts {
  path: string
  client: DiscordClient
}

export default class loader {
  private path: string
  private client: DiscordClient

  constructor (opts: loaderOpts) {
    this.path = opts.path
    this.client = opts.client
  }

  public async load (): Promise<void> {
    const commands = await this.loadCommands()
    const events = await this.loadEvents()
    events.forEach((event, eventName) => {
      this.client.on(eventName, event.handler.bind(null, this.client, commands))
    })
  }

  private async loadEvents (): Promise<EventCollection> {
    const eventPath = `${this.path}/events`
    const events = new DiscordCollection <string, EventInterface>()
    const files = await fs.readdir(eventPath).catch((err) => {
      log.error(err)
      return []
    })
    files.forEach(file => {
      if (!this.isValidFile(file)) return
      const fullPath = `${eventPath}/${file}`
      const event = require(fullPath)
      const eventName = this.getEventNameFromFile(file)
      events.set(eventName, event)
      delete require.cache[require.resolve(fullPath)]
    })
    return events
  }

  private async loadCommands (): Promise<CommandCollection> {
    const commandPath = `${this.path}/commands`
    const commands = new DiscordCollection<string, CommandInterface>()
    const files = await fs.readdir(commandPath).catch((err) => {
      log.error(err)
      return []
    })
    files.forEach(file => {
      if (!this.isValidFile(file)) return
      const fullPath = `${commandPath}/${file}`
      const props = require(fullPath)
      const commandName = file.split('.')[0]
      commands.set(commandName, props)
    })
    return commands
  }

  private getEventNameFromFile (file: string): string {
    return file.split('.')[0]
  }

  private isValidFile (file: string): boolean {
    return file.endsWith('.js')
  }
}
