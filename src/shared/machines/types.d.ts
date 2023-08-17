import type {
  AnyStateMachine,
  InterpreterFrom,
  Prop,
  StateFrom,
  StateMachine,
  StateSchema,
  Typestate,
  AnyEventObject
} from 'xstate'

export interface Context<T = any> {
  data: T
  error: string
}

export interface MachineEventObject<T = Record<string, any>> extends AnyEventObject {
  data: T
}

export type DefaultStateMachine<T, E> = StateMachine<Context<T>, StateSchema<Context<T>>, MachineEventObject<E>, Typestate<Context<T>>>

export interface UseMachineReturn<TMachine extends AnyStateMachine, TInterpreter = InterpreterFrom<TMachine>> {
  state: Ref<StateFrom<TMachine>>
  send: Prop<TInterpreter, 'send'>
  service: TInterpreter
}
