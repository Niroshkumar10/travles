export class ApiError extends Error {
  constructor(message, status = 500) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export class NotFoundError extends ApiError {
  constructor(resource) {
    super(`${resource} not found`, 404)
    this.name = 'NotFoundError'
  }
}
