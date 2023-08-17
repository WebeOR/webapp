import type { Maybe } from 'src/types/scalars'

export const qLayoutKey = '_q_l_'

interface QLayout {
  containerHeight: number
  footer: {
    offset: number
    size: number
    space: boolean
  }
  header: {
    offset: number
    size: number
    space: boolean
  }
  height: number
  isContainer: boolean
  left: {
    offset: number
    size: number
    space: boolean
  }
  right: {
    offset: number
    size: number
    space: boolean
  }
  rootRef: HTMLDivElement
  rows: {
    bottom: string[]
    middle: string[]
    top: string[]
  }
  scroll: {
    direction: 'down' | 'up'
    inflectionPoint: number
    position: number
  }
  scrollbarWidth: number
  totalWidth: number
  view: string
}

export function useQLayout(): Maybe<QLayout> {
  return inject<QLayout>(qLayoutKey)
}
