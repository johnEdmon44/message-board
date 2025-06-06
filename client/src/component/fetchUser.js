import axios from "axios";

export async function fetchUser() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/user`, { withCredentials: true });
    return response.data.user;
  } catch {
    return null
  }
}