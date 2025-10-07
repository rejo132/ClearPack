import axios from "axios";
import { getToken } from "../utils/tokenStorage";

const api = axios.create({
  baseURL: "/api" // RELATIVE path for unified deployment
});

// attach token when present
api.interceptors.request.use((cfg) => {
  const token = getToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
