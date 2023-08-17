import mitt, {
  type Emitter,
  type EventHandlerMap,
  type EventType,
  type Handler,
} from 'mitt'

import type { Keys, PromiseOr } from 'src/types/scalars'

import type { BasePromiseEvent } from '../types/utils'

export type AwaitableEvent<P extends Record<string, any>, T = any> = P & BasePromiseEvent<T>

interface AwaitableEventReturn<P extends Record<string, any>, T = any> {
  readonly event: P & BasePromiseEvent<T>
  readonly awaitable: Promise<T>
}

export function makeAwaitableEvent<P extends Record<string, any>, T>(action: P): AwaitableEventReturn<P, T> {
  const event: AwaitableEvent<P, T> = {
    ...toRaw(action),
    reject: () => {},
    resolve: () => {},
  }

  const awaitable = new Promise<T>((resolve, reject) => {
    event.resolve = resolve
    event.reject = reject
  })

  return {
    awaitable,
    event,
  }
}

export class BaseEventEmitter<EventsLib> {
  private agent: Emitter<EventsLib & Record<EventType, unknown>>

  public constructor() {
    this.agent = mitt()
  }

  public events(): EventHandlerMap<EventsLib & Record<EventType, unknown>> {
    return this.agent.all
  }

  public emit<K extends Keys<EventsLib>>(eventName: K, data: EventsLib[K]): PromiseOr<void> {
    return this.agent.emit(eventName, data as any)
  }

  public on<K extends Keys<EventsLib>>(eventName: K, fn: Handler<EventsLib[K]>): void {
    this.agent.on(eventName, fn)
  }

  public off<K extends Keys<EventsLib>>(eventName: K, fn: Handler<EventsLib[K]>): void {
    this.agent.off(eventName, fn)
  }
}
