import { useCallback, useEffect, useState, useMemo } from "react";
import * as customerService from "../services/customer.service";

export const useCustomers = (initialParams = {}, autoLoad = true) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stableParams = useMemo(
    () => initialParams,
    [JSON.stringify(initialParams)],
  );

  const loadCustomers = useCallback(
    async (params = stableParams) => {
      setLoading(true);
      setError(null);

      try {
        const response = await customerService.getCustomers(params);
        const items = Array.isArray(response)
          ? response
          : (response?.data ?? response);
        setCustomers(items || []);
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
      loadCustomers();
    }
  }, [autoLoad, loadCustomers]);

  return {
    customers,
    loading,
    error,
    loadCustomers,
    getCustomer: customerService.getCustomer,
    createCustomer: customerService.createCustomer,
    updateCustomer: customerService.updateCustomer,
    deleteCustomer: customerService.deleteCustomer,
    massUpdateCustomers: customerService.massUpdateCustomers,
    massDestroyCustomers: customerService.massDestroyCustomers,
  };
};
