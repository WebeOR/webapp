/*
 * @example
 * runSequence(urls.map(url => () => $.ajax(url)))
 */
export function runSequence<T = any>(promises: Array<() => Promise<T>>): Promise<T[]> {
  return promises.reduce<Promise<T[]>>((promise, func) => promise.then(result => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]))
}

export function delayed(timeout: number): Promise<number> {
  return new Promise((resolve) => { setTimeout(() => resolve(timeout), timeout) })
}
