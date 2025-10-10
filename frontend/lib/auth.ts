import Cookies from "js-cookie";
import api from "./api";
import { User, UserRegister, UserLogin, AuthTokens } from "@/types";

export const authService = {
  async register(data: UserRegister): Promise<User> {
    const response = await api.post<User>("/api/auth/register", data);
    return response.data;
  },

  async login(data: UserLogin): Promise<AuthTokens> {
    const response = await api.post<AuthTokens>("/api/auth/login", data);
    const { access_token, refresh_token } = response.data;

    // Store tokens in cookies
    Cookies.set("access_token", access_token, { expires: 1 / 24 }); // 1 hour
    Cookies.set("refresh_token", refresh_token, { expires: 7 }); // 7 days

    return response.data;
  },

  async logout(): Promise<void> {
    try {
      const refreshToken = Cookies.get("refresh_token");
      if (refreshToken) {
        await api.post("/api/auth/logout", { refresh_token: refreshToken });
      }
    } finally {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
    }
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/api/auth/me");
    return response.data;
  },

  isAuthenticated(): boolean {
    return !!Cookies.get("access_token");
  },
};

