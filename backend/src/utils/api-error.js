export class ApiError extends Error {
  constructor(statusCode, message, errors = null) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export function badRequest(message, errors = null) {
  return new ApiError(400, message, errors);
}

export function unauthorized(message = "Unauthorized") {
  return new ApiError(401, message);
}

export function forbidden(message = "Forbidden") {
  return new ApiError(403, message);
}

export function notFound(message = "Not Found") {
  return new ApiError(404, message);
}

export function conflict(message, errors = null) {
  return new ApiError(409, message, errors);
}

export function validationError(errors) {
  return new ApiError(422, "Validation Error", errors);
}
