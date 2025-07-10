import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Auth
export async function loginUser(data) {
  const res = await API.post("/auth/login", data);
  return res.data;
}

export async function registerUser(data) {
  const res = await API.post("/auth/register", data);
  return res.data;
}

export async function getCurrentUser() {
  const res = await API.get("/auth/me");
  return res.data;
}
