import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-backend-80si.onrender.com",
  timeout: 5000, // handles slow APIs
});

export default API;
