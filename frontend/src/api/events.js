import axios from "axios";
import Cookies from "js-cookie";
const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Events
export async function getEvents(page, filters) {
  const params = { page, ...filters };
  const res = await API.get("/events", { params: filters });
  return res.data;
}

export async function getEventById(id) {
  const res = await API.get(`/events/${id}`);
  return res.data;
}

export async function getFilteredEvents() {
  const res = await API.get("/events/filters");
  return res.data;
}

export async function createEvent(eventData) {
  const res = await API.post("/events", eventData);
  return res.data;
}

export async function registerForEvent(eventId) {
  const res = await API.post(`/eventReg/${eventId}/register`);
  return res.data;
}

export async function getAllEvents(filters = {}) {
  const res = await API.get("/events", { params: filters });
  return res.data;
}

export async function updateEvent(id, updatedData) {
  const res = await API.put(`/events/${id}`, updatedData);
  return res.data;
}

export async function deleteEvent(id) {
  const res = await API.delete(`/events/${id}`);
  return res.data;
}
