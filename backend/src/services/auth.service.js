import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { authRepository } from "../repositories/auth.repository.js";
import { auditRepository } from "../repositories/audit.repository.js";
import { unauthorized, validationError } from "../utils/api-error.js";

function serializeUser(user, permissions = []) {
  return {
    id: user.id,
    username: user.username,
    full_name: user.full_name,
    email: user.email,
    department: user.department,
    status: user.status,
    avatar: user.avatar,
    role: user.role_name,
    permissions,
  };
}

export async function login(username, password) {
  const errors = {};
  if (!username) errors.username = "Username is required";
  if (!password) errors.password = "Password is required";
  if (Object.keys(errors).length) {
    throw validationError(errors);
  }

  const user = await authRepository.findByUsername(username);
  const validPassword = user
    ? await bcrypt.compare(password, user.password_hash)
    : false;

  if (!user || !validPassword) {
    throw unauthorized("Invalid username or password");
  }

  const permissions = await authRepository.listPermissionCodes(user.id);
  const payload = {
    sub: user.id,
    id: user.id,
    username: user.username,
    role: user.role_name,
    permissions,
  };
  const token = jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

  await auditRepository.create({
    user_id: user.id,
    action: "Login",
    entity: "session",
    entity_id: null,
    detail: "User logged in",
  });

  return {
    token,
    user: serializeUser(user, permissions),
  };
}

export async function logout(user) {
  await auditRepository.create({
    user_id: user.id,
    action: "Logout",
    entity: "session",
    entity_id: null,
    detail: "User logged out",
  });
}

export async function me(userId) {
  const user = await authRepository.findById(userId);
  if (!user) {
    throw unauthorized();
  }

  const permissions = await authRepository.listPermissionCodes(user.id);
  return serializeUser(user, permissions);
}
