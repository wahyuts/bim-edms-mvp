import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { unauthorized } from "../utils/api-error.js";

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) {
    return next(unauthorized());
  }

  try {
    const token = authHeader.slice("Bearer ".length);
    req.user = jwt.verify(token, env.jwtSecret);
    return next();
  } catch (error) {
    return next(unauthorized("Invalid or expired token"));
  }
}
