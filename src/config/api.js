import axios from "axios";





const api = axios.create({
  baseURL: "https://password-manager-backend-kappa.vercel.app/",
  withCredentials: true, // if you are using cookies / sessions
});
export default api;