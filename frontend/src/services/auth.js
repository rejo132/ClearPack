import api from "./api";
import { saveToken } from "../utils/tokenStorage";

/**
 * login: call backend /api/auth/login
 * signup: call /api/auth/signup
 * backend returns { token } on success
 */

export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });
  saveToken(res.data.token);
  return res.data;
}

export async function signup(payload) {
  // payload: {admission_number, full_name, email, phone, password}
  const res = await api.post("/auth/signup", payload);
  // backend returns { id } on success; do not save token here
  return res.data;
}
