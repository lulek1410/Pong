import { useCallback, useEffect, useState } from "react";
import { User } from "../context/State";

let logoutTimer: number | undefined;

export interface UserData {
  user: User;
  expirationDate: string;
}

export const useAuth = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  const login = useCallback((user: User, expirationDate?: Date) => {
    setUserId(user.userId);
    setEmail(user.email);
    setName(user.name);
    setToken(user.token);
    const expiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    setExpirationDate(expiration);
    const userData: UserData = {
      user,
      expirationDate: expiration.toISOString(),
    };
    window.localStorage.setItem("userData", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setExpirationDate(null);
    setToken(null);
    setEmail(null);
    setName(null);
    window.localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && expirationDate) {
      const remainingTime = expirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, expirationDate, logout]);

  useEffect(() => {
    const userData = window.localStorage.getItem("userData");
    if (userData) {
      const parsedData: UserData = JSON.parse(userData);
      if (new Date(parsedData.expirationDate) > new Date()) {
        login(parsedData.user, new Date(parsedData.expirationDate));
      }
    }
  }, [login]);

  return { login, logout, token, userId, email, name };
};
