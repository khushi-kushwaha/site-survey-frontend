import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Register API
export const registerUser = (data) => {
  return API.post("/users/register", data);
};

export const loginUser = (data) => {
  return API.post("/users/login", data);
};