import mitt, {
  type Emitter,
  type EventHandlerMap,
  type Handler,
} from 'mitt'

import type { Keys, PromiseOr } from 'src/types/scalars'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type EventsLib = {
  auth_login: boolean
  auth_required: boolean
  auth_logout: Record<string, string>
  auth_restricted: Record<string, string>
  api_error: string
}

export type EventKeys = Keys<EventsLib>

interface EmitOption<K = EventKeys, T = any> {
  eventName: K
  data?: T
  broadcastOnly?: boolean
}

class EventService {
  private agent: Emitter<EventsLib>

  public constructor() {
    this.agent = mitt<EventsLib>()
  }

  public events(): EventHandlerMap<EventsLib> {
    return this.agent.all
  }

  public emit<K extends Keys<EventsLib>>({ eventName, data }: EmitOption<K, EventsLib[K]>): PromiseOr<void> {
    if (import.meta.env.DEV)
      console.log(`[EVENTS] emits "${eventName}": ${JSON.stringify(data)}`)
    return this.agent.emit(eventName, data!)
  }

  public on<K extends Keys<EventsLib>>(eventName: K, fn: Handler<EventsLib[K]>): void {
    if (import.meta.env.DEV)
      console.log(`[EVENTS] on "${eventName}"`)
    this.agent.on(eventName, fn)
  }

  public off<K extends Keys<EventsLib>>(eventName: K, fn: Handler<EventsLib[K]>): void {
    if (import.meta.env.DEV)
      console.log(`[EVENTS] off "${eventName}"`)
    this.agent.off(eventName, fn)
  }

  public dispose() {
    this.agent.all.clear()
  }
}

export const Events = new EventService()
