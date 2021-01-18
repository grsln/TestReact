import axios from "axios";

const API_URL = "https://testapi.host/api/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "token/", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.access) {
          const user = {
            token: response.data,
            email: email,
          };
          localStorage.setItem("user", JSON.stringify(user));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "user/create/", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    const currentUser = localStorage.getItem("user");
    return currentUser ? JSON.parse(currentUser) : null;
  }
}

export default new AuthService();
