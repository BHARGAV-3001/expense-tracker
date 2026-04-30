import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000, // handles slow APIs
});

export default API;