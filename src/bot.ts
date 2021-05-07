import { Client, CommandInterface, EventInterface } from '@/types'
import { loadCollection } from '@/utils/loader'

export type BotConfig = {
  token: string,
  client: Client,
  path?: string
}

/**
 * Basic bot.
 */
export default class Bot {
  private token: string
  private client: Client
  private path: string

  constructor (config: BotConfig) {
    this.token = config.token
    this.client = config.client
    this.path = config.path ?? '.'
  }

  public async run (): Promise<void> {
    await this.initialize()
    this.start()
  }

  private async initialize (): Promise<void> {
    const commands = await loadCollection<CommandInterface>(`${this.path}/commands`)
    const events = await loadCollection<EventInterface>(`${this.path}/events`)
    events.forEach((event, eventName) => {
      this.client.on(eventName, event.handler.bind(null, this.client, commands))
    })
  }

  private start (): void {
    this.client.login(this.token)
  }
}
