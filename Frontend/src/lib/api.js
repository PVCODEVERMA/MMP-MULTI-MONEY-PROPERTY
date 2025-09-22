import axios from "axios";
export default axios.create({
  baseURL        : import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true ,        // <-- sends httpOnly refresh/access cookies
  headers        : { "Content-Type":"application/json" }
});
