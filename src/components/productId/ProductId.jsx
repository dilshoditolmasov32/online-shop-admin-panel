import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../product-card/ProductCard";
import { useOrders } from "../../hooks/useOrders";
import { useProducts } from "../../hooks/useProducts";
import "./ProductId.css";

const statusCardColorMap = {
  pending: "#CCE6EF",
  processing: "#F6FFB9",
  shipping: "#E8F5E9",
  completed: "#FFDFA7",
  canceled: "#FFCBCB",
};

const formatDateTime = (value) => {
  if (!value) {
    return {
      date: "-",
      time: "-",
    };
  }

  const dateValue = new Date(value);

  return {
    date: dateValue.toLocaleDateString("ru-RU"),
    time: dateValue.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const ProductId = () => {
  const { id } = useParams();
  const { getOrder } = useOrders({}, false);
  const { getProduct } = useProducts({}, false);
  const [order, setOrder] = useState(null);
  const [productsById, setProductsById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Buyurtma ID topilmadi.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadOrderDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const orderResponse = await getOrder(id);

        if (cancelled) {
          return;
        }

        setOrder(orderResponse);

        const productIds = [
          ...new Set(
            (orderResponse?.items || [])
              .map((item) => item?.product_id || item?.additional?.product_id)
              .filter(Boolean),
          ),
        ];

        if (!productIds.length) {
          setProductsById({});
          return;
        }

        const products = await Promise.all(
          productIds.map(async (productId) => {
            try {
              const product = await getProduct(productId);
              return [productId, product];
            } catch (productError) {
              console.error(
                `Product ${productId} could not be loaded:`,
                productError,
              );
              return [productId, null];
            }
          }),
        );

        if (!cancelled) {
          setProductsById(Object.fromEntries(products));
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError?.response?.data?.message ||
              loadError?.message ||
              "Buyurtma ma'lumotlarini yuklab bo'lmadi.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadOrderDetails();

    return () => {
      cancelled = true;
    };
  }, [getOrder, getProduct, id]);

  const customerName = useMemo(() => {
    if (!order) {
      return "-";
    }

    return (
      order.customer?.name ||
      `${order.customer_first_name || ""} ${order.customer_last_name || ""}`.trim() ||
      "-"
    );
  }, [order]);

  const orderDateTime = useMemo(
    () => formatDateTime(order?.created_at),
    [order?.created_at],
  );

  const orderCard = useMemo(() => {
    if (!order) {
      return null;
    }

    return {
      name: customerName,
      number: order.increment_id || order.id,
      sum: order.formatted_grand_total || "-",
      phone:
        order.billing_address?.phone ||
        order.shipping_address?.phone ||
        order.customer?.phone ||
        order.customer_email ||
        "-",
      date: orderDateTime.date,
      time: orderDateTime.time,
      tag: order.channel_name ? `#${order.channel_name}` : "#buyurtma",
      status: order.status_label || order.status || "-",
      color: statusCardColorMap[order.status] || "#CCE6EF",
    };
  }, [customerName, order, orderDateTime.date, orderDateTime.time]);

  return (
    <div className="productId-page">
      <div className="productId-sidebar">
        <div className="productId-card-column">
          <div className="productId-card-header">
            <p>{`\u2022 Buyurtma`}</p>
            <div className="productId-card-meta">
              <div className="productId-buyurtma">
                <p>mahsulotlar:</p>
                <span>{loading ? "..." : order?.total_item_count || 0}</span>
              </div>
              <div className="productId-summa-card">
                <p>umumiy summa:</p>
                <span>{loading ? "..." : order?.formatted_grand_total || "-"}</span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="productId-card-card productId-card-skeleton">
              <div className="productId-skeleton-line productId-skeleton-title" />
              <div className="productId-skeleton-block productId-skeleton-sum" />
              <div className="productId-skeleton-row">
                <div className="productId-skeleton-chip" />
                <div className="productId-skeleton-chip" />
              </div>
              <div className="productId-skeleton-row">
                <div className="productId-skeleton-date" />
                <div className="productId-skeleton-date" />
              </div>
            </div>
          ) : orderCard ? (
            <div
              className="productId-card-card"
              style={{ backgroundColor: orderCard.color }}
            >
              <div className="card-header">
                <strong>{orderCard.name}</strong>
                <span>{`\u2116${orderCard.number}`}</span>
              </div>
              <div className="card-sum">
                <span>summa</span>:<br />
                <h3>{orderCard.sum}</h3>
              </div>
              <div className="card-footer">
                <span className="card-phone">{orderCard.phone}</span>
                <span className="card-status">{orderCard.status}</span>
              </div>
              <div className="card-meta">
                <span>{orderCard.tag}</span>
                <div className="date-time">
                  <span>{orderCard.date}</span>
                  <span>{orderCard.time}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="productId-empty-card">
              Buyurtma ma'lumoti topilmadi.
            </div>
          )}

          {error ? <div className="productId-error">{error}</div> : null}
        </div>
      </div>
      <ProductCard
        order={order}
        productsById={productsById}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default ProductId;
