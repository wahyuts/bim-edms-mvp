import { fail } from "../utils/response.js";

export function notFoundHandler(req, res) {
  return fail(res, 404, "Route not found");
}

export function errorHandler(error, req, res, next) {
  if (error.code === "LIMIT_FILE_SIZE") {
    return fail(res, 422, "Validation Error", {
      file: "File size exceeds upload limit",
    });
  }

  const statusCode = error.statusCode || 500;
  if (statusCode >= 500) {
    console.error(error);
  }

  return fail(
    res,
    statusCode,
    statusCode >= 500 ? "Internal Server Error" : error.message,
    error.errors || null
  );
}
