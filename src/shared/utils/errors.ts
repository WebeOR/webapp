export class UiError extends Error {
  public constructor(
    public message = 'unknown error',
    public params: Record<string, any> = {},
  ) {
    super()
    this.name = 'UI error'
  }
}
