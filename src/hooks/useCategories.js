import { useCallback, useEffect, useMemo, useState } from "react";
import * as categoryService from "../services/category.service";

export const useCategories = (initialParams = {}, autoLoad = true) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stableParams = useMemo(
    () => initialParams,
    [JSON.stringify(initialParams)],
  );

  const loadCategories = useCallback(
    async (params = stableParams) => {
      setLoading(true);
      setError(null);

      try {
        const response = await categoryService.getCategories(params);
        const items = Array.isArray(response)
          ? response
          : (response?.data ?? response);
        setCategories(items || []);
        return response;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [stableParams],
  );

  useEffect(() => {
    if (autoLoad) {
      loadCategories();
    }
  }, [autoLoad, loadCategories]);

  const getCategory = useCallback((id) => categoryService.getCategory(id), []);

  const createCategory = useCallback(
    async (data) => {
      const response = await categoryService.createCategory(data);
      await loadCategories();
      return response;
    },
    [loadCategories],
  );

  const updateCategory = useCallback(
    async (id, data) => {
      const response = await categoryService.updateCategory(id, data);
      await loadCategories();
      return response;
    },
    [loadCategories],
  );

  const deleteCategory = useCallback(
    async (id) => {
      const response = await categoryService.deleteCategory(id);
      await loadCategories();
      return response;
    },
    [loadCategories],
  );

  const massUpdateCategories = useCallback(
    async (data) => {
      const response = await categoryService.massUpdateCategories(data);
      console.log(response)
      await loadCategories();
      return response;
    },
    [loadCategories],
  );

  const massDestroyCategories = useCallback(
    async (data) => {
      const response = await categoryService.massDestroyCategories(data);
      await loadCategories();
      return response;
    },
    [loadCategories],
  );

  return {
    categories,
    loading,
    error,
    loadCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    massUpdateCategories,
    massDestroyCategories,
  };
};
