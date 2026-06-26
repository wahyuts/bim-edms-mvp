import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/user.repository.js";
import { validationError, unauthorized } from "../utils/api-error.js";
import { getUser, updateUser } from "./user.service.js";

export async function updateProfile(user, body) {
  const current = await getUser(user.id);
  return updateUser(user.id, {
    name: body.name ?? body.full_name ?? current.name,
    username: body.username ?? current.username,
    email: body.email ?? current.email,
    department: body.department ?? current.department,
    role: current.role,
    status: current.status,
    avatar: current.avatar,
  });
}

export async function changePassword(user, body) {
  const currentPassword = body.currentPassword;
  const newPassword = body.newPassword;
  const confirmPassword = body.confirmPassword;
  const errors = {};

  if (!currentPassword) errors.currentPassword = "Current password is required";
  if (!newPassword) errors.newPassword = "New password is required";
  if (newPassword && newPassword.length < 8) errors.newPassword = "New password must be at least 8 characters";
  if (newPassword !== confirmPassword) errors.confirmPassword = "Password confirmation must match";

  if (Object.keys(errors).length) {
    throw validationError(errors);
  }

  const userWithPassword = await userRepository.findPasswordById(user.id);
  const validPassword = userWithPassword
    ? await bcrypt.compare(currentPassword, userWithPassword.password_hash)
    : false;

  if (!validPassword) {
    throw unauthorized("Current password is invalid");
  }

  const current = await getUser(user.id);
  await updateUser(user.id, {
    name: current.name,
    username: current.username,
    email: current.email,
    department: current.department,
    role: current.role,
    status: current.status,
    avatar: current.avatar,
    password: newPassword,
  });

  return { id: user.id };
}
