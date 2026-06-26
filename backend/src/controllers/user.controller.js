import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from "../services/user.service.js";
import { success } from "../utils/response.js";

export async function listUsersController(req, res) {
  return success(res, await listUsers(), "Users fetched");
}

export async function getUserController(req, res) {
  return success(res, await getUser(req.params.id), "User fetched");
}

export async function createUserController(req, res) {
  return success(res.status(201), await createUser(req.body), "User created");
}

export async function updateUserController(req, res) {
  return success(res, await updateUser(req.params.id, req.body), "User updated");
}

export async function deleteUserController(req, res) {
  return success(res, await deleteUser(req.params.id), "User deleted");
}
