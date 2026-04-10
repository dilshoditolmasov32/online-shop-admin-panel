import { useCallback, useEffect, useState, useMemo } from "react";
import * as orderService from "../services/order.service";

export const useOrders = (initialParams = {}, autoLoad = true) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stableParams = useMemo(
    () => initialParams,
    [JSON.stringify(initialParams)],
  );

  const loadOrders = useCallback(
    async (params = stableParams) => {
      setLoading(true);
      setError(null);

      try {
        const response = await orderService.getOrders(params);
        const items = Array.isArray(response)
          ? response
          : (response?.data ?? response);
        setOrders(items || []);
        return response;
      } catch (err) {
        setError(err);
        console.error("Error loading orders:", err);
      } finally {
        setLoading(false);
      }
    },
    [stableParams],
  );

  useEffect(() => {
    if (autoLoad) {
      loadOrders().catch((err) => {
        console.error("Orders auto-load failed:", err.message);
      });
    }
  }, [autoLoad, loadOrders]);

  return {
    orders,
    loading,
    error,
    loadOrders,
    getOrder: orderService.getOrder,
    createOrder: orderService.createOrder,
    updateOrder: orderService.updateOrder,
    deleteOrder: orderService.deleteOrder,
  };
};
