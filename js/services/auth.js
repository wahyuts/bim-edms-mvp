import { COLLECTIONS, ROUTES } from "../utils/constants.js";
import { createAudit } from "./audit.js";
import { deleteApi, getApi, postApi, putApi } from "./api.js";
import { get, getSingle, replaceSingle } from "./storage.js";

function normalizeApiUser(user) {
  return {
    ...user,
    name: user.name || user.full_name,
  };
}

export async function login(username, password, remember = false) {
  try {
    const response = await postApi("/auth/login", { username, password });
    const user = normalizeApiUser(response.data.user);
    replaceSingle(COLLECTIONS.session, {
      isLoggedIn: true,
      token: response.data.token,
      user,
      userId: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      remember,
    });
    return { success: true, user };
  } catch (error) {
    return { success: false, message: error.message || "Invalid username/password" };
  }
}

export function logout() {
  const session = getSingle(COLLECTIONS.session) || {};
  if (session.token) {
    postApi("/auth/logout", {}).catch(() => {});
  }
  createAudit({ action: "Logout", document: "-", detail: "Session Removed", user: session.name || session.username });
  replaceSingle(COLLECTIONS.session, { isLoggedIn: false });
  window.location.href = `./login.html#${ROUTES.login}`;
}

export function currentUser() {
  const session = getSingle(COLLECTIONS.session) || {};
  if (!session.isLoggedIn) {
    return null;
  }
  if (session.user) {
    return normalizeApiUser(session.user);
  }
  return get(COLLECTIONS.users).find((user) => Number(user.id) === Number(session.userId)) ?? null;
}

export function currentSession() {
  return getSingle(COLLECTIONS.session) || { isLoggedIn: false };
}

export function isLoggedIn() {
  const session = currentSession();
  return Boolean(session.isLoggedIn && session.token);
}

function saveSessionUser(user) {
  const normalizedUser = normalizeApiUser(user);
  replaceSingle(COLLECTIONS.session, {
    ...currentSession(),
    user: normalizedUser,
    userId: normalizedUser.id,
    name: normalizedUser.name,
    username: normalizedUser.username,
    role: normalizedUser.role,
  });
  return normalizedUser;
}

export async function updateProfile(data) {
  const user = currentUser();
  if (!user) {
    return { success: false, message: "User session not found." };
  }

  try {
    const response = await putApi("/profile", data);
    const updatedUser = saveSessionUser(response.data);
    createAudit({ action: "Edit Profile", document: "-", detail: "Profile updated", user: updatedUser.name });
    return { success: true, user: updatedUser };
  } catch (error) {
    return { success: false, message: error.message || "Failed to update profile." };
  }
}

export async function getUsers() {
  try {
    const response = await getApi("/users");
    return (response.data || []).map(normalizeApiUser);
  } catch {
    return get(COLLECTIONS.users);
  }
}

export async function createUser(data) {
  if (currentSession().role !== "Administrator") {
    return { success: false, message: "Only Administrator can create users." };
  }

  const username = data.username?.trim();
  const email = data.email?.trim();
  if (!username || !email) {
    return { success: false, message: "Username and email are required." };
  }

  try {
    const response = await postApi("/users", {
      ...data,
      name: data.name?.trim(),
      username,
      email,
      department: data.department?.trim(),
    });
    return { success: true, user: normalizeApiUser(response.data) };
  } catch (error) {
    return { success: false, message: error.message || "Failed to create user." };
  }
}

export async function updateUserProfile(userId, data) {
  if (currentSession().role !== "Administrator") {
    return { success: false, message: "Only Administrator can edit users." };
  }

  try {
    const response = await putApi(`/users/${userId}`, data);
    return { success: true, user: normalizeApiUser(response.data) };
  } catch (error) {
    return { success: false, message: error.message || "Failed to update user." };
  }
}

export async function deleteUserProfile(userId) {
  if (currentSession().role !== "Administrator") {
    return { success: false, message: "Only Administrator can delete users." };
  }

  try {
    const isCurrentUser = Number(currentSession().userId) === Number(userId);
    await deleteApi(`/users/${userId}`);
    return { success: true, deletedCurrentUser: isCurrentUser };
  } catch (error) {
    return { success: false, message: error.message || "Failed to delete user." };
  }
}

export async function changePassword(currentPassword, newPassword, confirmPassword) {
  try {
    await putApi("/profile/change-password", {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    createAudit({ action: "Change Password", document: "-", detail: "Password updated", user: currentUser()?.name });
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message || "Failed to change password." };
  }
}
