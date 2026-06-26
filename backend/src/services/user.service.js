import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/user.repository.js";
import { conflict, notFound, validationError } from "../utils/api-error.js";

function serializeUser(user) {
  return {
    ...user,
    name: user.full_name,
  };
}

function validatePayload(data, requirePassword = false) {
  const errors = {};
  if (!data.username) errors.username = "Username is required";
  if (!data.email) errors.email = "Email is required";
  if (!data.full_name) errors.name = "Name is required";
  if (!data.role) errors.role = "Role is required";
  if (requirePassword && !data.password) errors.password = "Password is required";

  if (Object.keys(errors).length) {
    throw validationError(errors);
  }
}

function normalizePayload(body = {}, existing = {}) {
  return {
    username: body.username?.trim() ?? existing.username,
    email: body.email?.trim() ?? existing.email,
    full_name: body.full_name?.trim() ?? body.name?.trim() ?? existing.full_name,
    department: body.department?.trim() ?? existing.department ?? null,
    role: body.role ?? existing.role,
    status: body.status ?? existing.status ?? "Active",
    avatar: body.avatar ?? existing.avatar ?? "",
    password: body.password,
  };
}

async function assertUnique(username, email, excludeId = null) {
  const duplicate = await userRepository.findByUsernameOrEmail(username, email, excludeId);
  if (!duplicate) {
    return;
  }

  throw conflict("User already exists", {
    username: duplicate.username === username ? "Username already exists" : undefined,
    email: duplicate.email === email ? "Email already exists" : undefined,
  });
}

async function resolveRoleId(role) {
  const roleId = await userRepository.findRoleId(role);
  if (!roleId) {
    throw validationError({ role: "Invalid role" });
  }

  return roleId;
}

export async function listUsers() {
  const users = await userRepository.list();
  return users.map(serializeUser);
}

export async function getUser(id) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw notFound("User not found");
  }

  return serializeUser(user);
}

export async function createUser(body) {
  const payload = normalizePayload(body);
  validatePayload(payload, true);
  await assertUnique(payload.username, payload.email);
  const roleId = await resolveRoleId(payload.role);
  const id = await userRepository.create({
    username: payload.username,
    email: payload.email,
    full_name: payload.full_name,
    department: payload.department,
    role_id: roleId,
    status: payload.status,
    avatar: payload.avatar,
    password_hash: await bcrypt.hash(payload.password, 10),
  });

  return getUser(id);
}

export async function updateUser(id, body) {
  const existing = await getUser(id);
  const payload = normalizePayload(body, existing);
  validatePayload(payload, false);
  await assertUnique(payload.username, payload.email, id);
  const roleId = await resolveRoleId(payload.role);
  await userRepository.update(id, {
    username: payload.username,
    email: payload.email,
    full_name: payload.full_name,
    department: payload.department,
    role_id: roleId,
    status: payload.status,
    avatar: payload.avatar,
    password_hash: payload.password ? await bcrypt.hash(payload.password, 10) : null,
  });

  return getUser(id);
}

export async function deleteUser(id) {
  await getUser(id);
  await userRepository.remove(id);
  return { id: Number(id) };
}
