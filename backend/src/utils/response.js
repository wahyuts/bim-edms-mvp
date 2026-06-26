export function success(res, data = null, message = "Success", meta = {}) {
  return res.json({
    success: true,
    message,
    data,
    meta,
  });
}

export function fail(res, statusCode, message, errors = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
  });
}

