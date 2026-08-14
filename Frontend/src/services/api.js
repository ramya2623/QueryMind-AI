import axios from "axios";

const API = axios.create({
  baseURL: "https://querymind-ai-vwp2.onrender.com",
  timeout: 120000,
});

export default API;
