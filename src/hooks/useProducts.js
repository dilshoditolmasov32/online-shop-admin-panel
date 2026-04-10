import { useCallback, useEffect, useState, useMemo } from "react";
import * as productService from "../services/product.service";

export const useProducts = (initialParams = {}, autoLoad = true) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stableParams = useMemo(
    () => initialParams,
    [JSON.stringify(initialParams)],
  );

  const loadProducts = useCallback(
    async (params = stableParams) => {
      setLoading(true);
      setError(null);

      try {
        const response = await productService.getProducts(params);
        const items = Array.isArray(response)
          ? response
          : (response?.data ?? response);
        setProducts(items || []);
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
      loadProducts();
    }
  }, [autoLoad, loadProducts]);

  const getProduct = useCallback((id) => productService.getProduct(id), []);

  const createProduct = useCallback(
    async (data) => {
      const response = await productService.createProduct(data);
      await loadProducts();
      return response;
    },
    [loadProducts],
  );

  const updateProduct = useCallback(
    async (id, data) => {
      const response = await productService.updateProduct(id, data);
      await loadProducts();
      return response;
    },
    [loadProducts],
  );

  const updateProductConfigurable = useCallback(
    async (id, data) => {
      const response = await productService.updateProductConfigurable(id, data);
      await loadProducts();
      return response;
    },
    [loadProducts],
  );

  const deleteProduct = useCallback(
    async (id) => {
      const response = await productService.deleteProduct(id);
      await loadProducts();
      return response;
    },
    [loadProducts],
  );

  const updateProductInventory = useCallback(
    async (id, data) => {
      const response = await productService.updateProductInventory(id, data);
      await loadProducts();
      return response;
    },
    [loadProducts],
  );

  const massUpdateProducts = useCallback(
    async (data) => {
      const response = await productService.massUpdateProducts(data);
      await loadProducts();
      return response;
    },
    [loadProducts],
  );

  const massDestroyProducts = useCallback(
    async (data) => {
      const response = await productService.massDestroyProducts(data);
      await loadProducts();
      return response;
    },
    [loadProducts],
  );

  return {
    products,
    loading,
    error,
    loadProducts,
    getProduct,
    createProduct,
    updateProduct,
    updateProductConfigurable,
    deleteProduct,
    updateProductInventory,
    massUpdateProducts,
    massDestroyProducts,
  };
};
