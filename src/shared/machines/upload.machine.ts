import {
  type Typestate,
  assign,
  createMachine,
} from 'xstate'

import type {
  Context,
  DefaultStateMachine,
  MachineEventObject,
} from '@shared/machines/types'

export type UploadMachineStateList = 'idle' | 'loading' | 'success' | 'failure' | 'prepared'

export function useUploadMachine<T, E = Record<string, any>>(data: T, initial: UploadMachineStateList = 'loading', final = false): DefaultStateMachine<T, E> {
  return createMachine<Context<T>, MachineEventObject<E>, Typestate<Context<T>>>({
    context: () => ({ data, error: '' }),
    id: 'upload',
    initial,
    predictableActionArguments: true,
    schema: { context: {} as Context<T> },
    states: {
      failure: {
        entry: 'onFailure',
        on: {
          AWAIT: {
            target: 'idle',
          },
          RETRY: {
            target: 'loading',
          },
        },
      },
      idle: {
        entry: 'onIdle',
        on: {
          PREPARE: {
            actions: assign({
              data: (ctx, { type, ...event }) => ({
                ...ctx.data,
                ...event,
              }),
            }),
            target: 'prepared',
          },
        },
      },
      loading: {
        invoke: {
          onDone: {
            actions: assign({
              data: (ctx, event) => ({
                ...ctx.data,
                result: (event.data && 'data' in event.data) ? event.data.data : event.data,
              }),
            }),
            target: 'success',
          },
          onError: {
            actions: assign({
              error: (_, event) => {
                console.dir(event, { depth: 10 })
                if ('data' in event.data)
                  return event.data.data.message

                if ('message' in event.data)
                  return event.data.message

                return event.data
              },
            }),
            target: 'failure',
          },
          src: 'uploadFn',
        },
      },
      prepared: {
        on: {
          AWAIT: {
            target: 'idle',
          },
          FETCH: {
            target: 'loading',
          },
        },
      },
      success: {
        entry: 'onSuccess',
        on: {
          AWAIT: {
            target: 'idle',
          },
        },
        type: final ? 'final' : 'atomic',
      },
    },
  })
}
