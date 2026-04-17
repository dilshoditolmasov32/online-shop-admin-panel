import { useCallback, useEffect, useState, useMemo } from "react";
import * as userService from "../services/user.service";
import { toast } from "react-toastify";

export const useUsers = (initialParams = {}, autoLoad = true) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        toast.error("Failed to load users");
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

  // Create user
  const handleCreateUser = useCallback(async (userData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const newUser = await userService.createUser(userData);
      setUsers((prev) => [...prev, newUser]);
      toast.success("User created successfully");
      return newUser;
    } catch (err) {
      setError(err);
      console.error("Error creating user:", err);
      toast.error(err?.response?.data?.message || "Failed to create user");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // Update user
  const handleUpdateUser = useCallback(async (id, userData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const updatedUser = await userService.updateUser(id, userData);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? updatedUser : user)),
      );
      toast.success("User updated successfully");
      return updatedUser;
    } catch (err) {
      setError(err);
      console.error("Error updating user:", err);
      toast.error(err?.response?.data?.message || "Failed to update user");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // Delete user
  const handleDeleteUser = useCallback(async (id) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
    } catch (err) {
      setError(err);
      console.error("Error deleting user:", err);
      toast.error(err?.response?.data?.message || "Failed to delete user");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // Get single user
  const handleGetUser = useCallback(async (id) => {
    setError(null);
    try {
      return await userService.getUser(id);
    } catch (err) {
      setError(err);
      console.error("Error fetching user:", err);
      toast.error("Failed to load user details");
      throw err;
    }
  }, []);

  return {
    users,
    loading,
    isSubmitting,
    error,
    loadUsers,
    getUser: handleGetUser,
    createUser: handleCreateUser,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
    massUpdateUsers: userService.massUpdateUsers,
    massDestroyUsers: userService.massDestroyUsers,
  };
};
