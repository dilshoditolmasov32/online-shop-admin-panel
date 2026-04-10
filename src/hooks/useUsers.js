import { useCallback, useEffect, useState, useMemo } from "react";
import * as userService from "../services/user.service";

export const useUsers = (initialParams = {}, autoLoad = true) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stableParams = useMemo(
    () => initialParams,
    [JSON.stringify(initialParams)],
  );

  const loadUsers = useCallback(
    async (params = stableParams) => {
      setLoading(true);
      setError(null);

      try {
        const response = await userService.getUsers(params);
        const items = Array.isArray(response)
          ? response
          : (response?.data ?? response);
        setUsers(items || []);
        return response;
      } catch (err) {
        setError(err);
        console.error("Error loading users:", err);
      } finally {
        setLoading(false);
      }
    },
    [stableParams],
  );

  useEffect(() => {
    if (autoLoad) {
      loadUsers().catch((err) => {
        console.error("Users auto-load failed:", err.message);
      });
    }
  }, [autoLoad, loadUsers]);

  return {
    users,
    loading,
    error,
    loadUsers,
    getUser: userService.getUser,
    createUser: userService.createUser,
    updateUser: userService.updateUser,
    deleteUser: userService.deleteUser,
    massUpdateUsers: userService.massUpdateUsers,
    massDestroyUsers: userService.massDestroyUsers,
  };
};
