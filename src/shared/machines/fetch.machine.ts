import {
  type Typestate,
  assign,
  createMachine,
} from 'xstate'

import type {
  Context,
  DefaultStateMachine,
  MachineEventObject,
  UseMachineReturn,
} from './types'

export type FetchMachineStateList = 'idle' | 'loading' | 'success' | 'failure' | 'prepared'

export interface UseDefaultFetchMachineReturn<T, E> extends UseMachineReturn<DefaultStateMachine<T, E>> {
  current: ComputedRef<FetchMachineStateList>
  result: ComputedRef<T>
  error: ComputedRef<any>
}

export function useFetchMachine<T, E = Record<string, any>>(data: T, initial: FetchMachineStateList = 'loading', final = false): DefaultStateMachine<T, E> {
  return createMachine<Context<T>, MachineEventObject<E>, Typestate<Context<T>>>({
    context: () => ({ data, error: '' }),
    id: 'fetch',
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
          FETCH: {
            target: 'loading',
          },
        },
      },
      loading: {
        invoke: {
          onDone: {
            actions: assign({
              data: (_, event) => (event.data && event.data.data) ? event.data.data : event.data,
            }),
            target: 'success',
          },
          onError: {
            actions: assign({
              error: (_, event) => {
                console.dir(event, { depth: 10 })
                if (event.data.data)
                  return event.data.data.message

                if (event.data.message)
                  return event.data.message

                return event.data
              },
            }),
            target: 'failure',
          },
          src: 'fetchFn',
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
