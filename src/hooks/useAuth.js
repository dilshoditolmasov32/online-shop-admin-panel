import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as authService from "../services/auth.service";
import {
  setAccessToken,
  removeAccessToken,
  isAuthenticated as checkAuth,
} from "../utils/token";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = useCallback(
    async (payload) => {
      setLoading(true);
      setError(null);

      try {
        const data = await authService.login(payload);
        const token =
          data?.access_token ||
          data?.token ||
          data?.data?.access_token ||
          data?.data?.token;

        if (!token) {
          throw new Error("Токен авторизации не найден");
        }

        setAccessToken(token);
        toast.success("Вход выполнен успешно");
        navigate("/dashboard");
        return data;
      } catch (err) {
        setError(err);
        const message =
          err?.response?.data?.message || err?.message || "Ошибка входа";
        toast.error(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [navigate],
  );

  const signOut = useCallback(async () => {
    setLoading(true);

    try {
      await authService.logout();
      toast.info("Вы вышли из системы");
      navigate("/");
    } catch (err) {
      toast.error("Ошибка при выходе");
    } finally {
      removeAccessToken();
      setLoading(false);
    }
  }, [navigate]);

  return {
    signIn,
    signOut,
    loading,
    error,
    isAuthenticated: checkAuth(),
  };
};
