import axios from "axios";





const api = axios.create({
        
  baseURL: "https://password-manager-backend-kappa.vercel.app",
  // baseURL: "http://localhost:5000",
  withCredentials: true, // if you are using cookies / sessions
});
export default api;