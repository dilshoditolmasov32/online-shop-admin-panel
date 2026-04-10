import { useCallback, useEffect, useState, useMemo } from "react";
import * as inventorySourceService from "../services/inventory-source.service";

export const useInventorySources = (initialParams = {}, autoLoad = true) => {
  const [inventorySources, setInventorySources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stableParams = useMemo(
    () => initialParams,
    [JSON.stringify(initialParams)],
  );

  const loadInventorySources = useCallback(
    async (params = stableParams) => {
      setLoading(true);
      setError(null);

      try {
        const response =
          await inventorySourceService.getInventorySources(params);
        const items = Array.isArray(response)
          ? response
          : (response?.data ?? response);
        setInventorySources(items || []);
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
      loadInventorySources();
    }
  }, [autoLoad, loadInventorySources]);

  return {
    inventorySources,
    loading,
    error,
    loadInventorySources,
    getInventorySource: inventorySourceService.getInventorySource,
    createInventorySource: inventorySourceService.createInventorySource,
    updateInventorySource: inventorySourceService.updateInventorySource,
    deleteInventorySource: inventorySourceService.deleteInventorySource,
    massUpdateInventorySources:
      inventorySourceService.massUpdateInventorySources,
    massDestroyInventorySources:
      inventorySourceService.massDestroyInventorySources,
  };
};
