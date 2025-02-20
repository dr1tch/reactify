const createErrorClass = (errorName: string) => {
  return class extends Error {
    constructor(error: unknown) {
      const e =
        error instanceof Error
          ? error
          : new Error(typeof error === "string" ? error : "unknown")
      super(e.message)
      this.name = errorName
      this.message = e.message
      this.stack = (e.stack || "").replace(/^Error: /, `${errorName}: `)
    }
  }
}

export const BadRequestError = createErrorClass("BadRequestError")
export const NotFoundError = createErrorClass("NotFoundError")
export const UnauthorizedError = createErrorClass("UnauthorizedError")
export const GatewayTimeoutError = createErrorClass("GatewayTimeoutError")
export const BadGatewayError = createErrorClass("BadGatewayError")
export const ForbiddenError = createErrorClass("ForbiddenError")
export const HlsError = createErrorClass("HlsError")
export const SnapshotError = createErrorClass("SnapshotError")
