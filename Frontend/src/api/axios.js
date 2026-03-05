import axios from "axios";

const API = axios.create({
  baseURL: "https://auth-project-bai2.onrender.com",
  withCredentials: true,
});

export default API;
