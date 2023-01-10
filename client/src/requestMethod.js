import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/";
const BASE_URL = "https://dashboardexercisemern.vercel.app/api/";

export const request = axios.create({
  baseURL: BASE_URL,
});
