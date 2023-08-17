import type { Primitive } from 'src/types/scalars'

export function lastOf<T = any>(arr: T[]): T {
  return arr[arr.length - 1]
}

export function firstOf<T = any>(arr: T[]): T {
  return arr[0]
}

export function isLastOf(item: unknown, arr: any[]): boolean {
  return arr.indexOf(item) === arr.length - 1
}

export function isFirstOf(item: unknown, arr: any[]): boolean {
  return arr.indexOf(item) === 0
}

export function diffBetweenTwo<T extends Primitive>(first: T[], second: T[]): T[] {
  return [
    ...first.filter(x => !second.includes(x)),
    ...second.filter(x => !first.includes(x)),
  ]
}

export function intersectBetweenTwo<T extends Primitive>(first: T[], second: T[]): T[] {
  const set = new Set([
    ...first.filter(x => second.includes(x)),
    ...second.filter(x => first.includes(x)),
  ])
  return Array.from(set)
}

export function groupBy<T>(array: T[], predicate: (v: T) => string | number): Record<string, T[]> {
  return array.reduce<Record<string, T[]>>((acc, cur) => {
    (acc[predicate(cur)] ||= []).push(cur)
    return acc
  }, {})
}

export function rotateMatrix(p: any[][]): any[][] {
  const arr: any[][] = []
  for (let a = 0; a < p.length; a++) {
    for (let b = 0; b < p[a].length; b++) {
      const row = arr[b] || (arr[b] = [])
      row[a] = p[a][b]
    }
  }
  return arr
}

export function range(length: number): number[] {
  return Array.from({ length }, (_, i) => i)
}
