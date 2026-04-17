import { useCallback, useEffect, useState, useMemo } from "react";
import * as roleService from "../services/role.service";
import { toast } from "react-toastify";

export const useRoles = (initialParams = {}, autoLoad = true) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stableParams = useMemo(
    () => initialParams,
    [JSON.stringify(initialParams)],
  );

  // Load all roles
  const loadRoles = useCallback(
    async (params = stableParams) => {
      setLoading(true);
      setError(null);

      try {
        const response = await roleService.getRoles(params);
        const items = Array.isArray(response)
          ? response
          : (response?.data ?? response);
        setRoles(items || []);
        return response;
      } catch (err) {
        setError(err);
        console.error("Error loading roles:", err);
        toast.error("Failed to load roles");
      } finally {
        setLoading(false);
      }
    },
    [stableParams],
  );

  useEffect(() => {
    if (autoLoad) {
      loadRoles().catch((err) => {
        console.error("Roles auto-load failed:", err.message);
      });
    }
  }, [autoLoad, loadRoles]);

  // Get single role
  const handleGetRole = useCallback(async (id) => {
    setError(null);
    try {
      return await roleService.getRole(id);
    } catch (err) {
      setError(err);
      console.error("Error fetching role:", err);
      toast.error("Failed to load role details");
      throw err;
    }
  }, []);

  // Create role
  const handleCreateRole = useCallback(async (roleData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const newRole = await roleService.createRole(roleData);
      setRoles((prev) => [...prev, newRole]);
      toast.success("Role created successfully");
      return newRole;
    } catch (err) {
      setError(err);
      console.error("Error creating role:", err);
      toast.error(err?.response?.data?.message || "Failed to create role");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // Update role
  const handleUpdateRole = useCallback(async (id, roleData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const updatedRole = await roleService.updateRole(id, roleData);
      setRoles((prev) =>
        prev.map((role) => (role.id === id ? updatedRole : role)),
      );
      toast.success("Role updated successfully");
      return updatedRole;
    } catch (err) {
      setError(err);
      console.error("Error updating role:", err);
      toast.error(err?.response?.data?.message || "Failed to update role");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // Delete role
  const handleDeleteRole = useCallback(async (id) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await roleService.deleteRole(id);
      setRoles((prev) => prev.filter((role) => role.id !== id));
      toast.success("Role deleted successfully");
    } catch (err) {
      setError(err);
      console.error("Error deleting role:", err);
      toast.error(err?.response?.data?.message || "Failed to delete role");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    roles,
    loading,
    isSubmitting,
    error,
    loadRoles,
    getRole: handleGetRole,
    createRole: handleCreateRole,
    updateRole: handleUpdateRole,
    deleteRole: handleDeleteRole,
  };
};
