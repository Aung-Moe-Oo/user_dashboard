import axios from "axios";

const BASE_URL = "https://userdashboardapi.vercel.app/api/";

export const request = axios.create({
  baseURL: BASE_URL,
});
