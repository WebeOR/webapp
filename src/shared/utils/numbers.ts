import type { Integer } from 'src/types/scalars'

export function isInRange(val: number, start: number, end: number): boolean {
  return (val >= start && val <= end)
}

/**
 * This function returns a random integer between the min and max values, inclusive.
 * @param {number} min - The minimum number that can be returned.
 * @param {number} max - The maximum number in the range.
 * @returns A function that takes in a min and max and returns a random number between the two.
 */
export function randomIntFromInterval(min: Integer, max: Integer): Integer {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
