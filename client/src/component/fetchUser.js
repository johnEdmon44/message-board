import axios from "axios";

export async function fetchUser() {
  try {
    const response = await axios.get("http://localhost:3400/user/user", { withCredentials: true });
    console.log(response)
    return response.data.user;
  } catch {
    return null
  }
}