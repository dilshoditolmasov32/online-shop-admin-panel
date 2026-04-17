import CheckBox from "../checkbox/CheckBox";
import Input from "../input/Input";
import photo from "../../assets/images/photo.svg";
import "./ProductCard.css";

const getDateTime = (value) => {
  if (!value) {
    return "-";
  }

  const dateValue = new Date(value);
  return `${dateValue.toLocaleDateString("ru-RU")} ${dateValue.toLocaleTimeString(
    "ru-RU",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  )}`;
};

const getProductImage = (product) => {
  const images = product?.images || [];
  const firstImage = images[0];

  return (
    firstImage?.original_image_url ||
    firstImage?.url ||
    firstImage?.path ||
    firstImage?.small_image_url ||
    firstImage?.medium_image_url ||
    photo
  );
};

const getCategoryNames = (product, order) => {
  const categories = product?.categories;

  if (Array.isArray(categories) && categories.length) {
    return categories
      .map((category) => category?.name || category?.title || category)
      .filter(Boolean);
  }

  const rootCategory =
    order?.channel?.root_category?.translations?.find((item) => item?.name)
      ?.name;

  return rootCategory ? [rootCategory] : [];
};

const getDiscountText = (order) => {
  if (!order) {
    return "-";
  }

  if (Number(order.discount_percent) > 0) {
    return `${order.discount_percent}%`;
  }

  return order.formatted_discount_amount || "0 so'm";
};

const getStatusFlags = (status) => ({
  processing: status === "processing" || status === "shipping" || status === "completed",
  shipping: status === "shipping" || status === "completed",
  canceled: status === "canceled",
});

const ProductList = ({ order, productsById = {}, loading, error }) => {
  const customerName =
    order?.customer?.name ||
    `${order?.customer_first_name || ""} ${order?.customer_last_name || ""}`.trim();
  const statusFlags = getStatusFlags(order?.status);
  const items = order?.items || [];

  if (loading) {
    return (
      <div className="productId-data">
        <div className="product-card-panel-skeleton" />
        <div className="product-card-panel-skeleton tall" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="productId-data">
        <div className="product-card-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="productId-data">
      <h3>Ma'lumotlar</h3>
      <div className="fullname-phone-data">
        <Input
          title="Ism Familiya"
          text={customerName || "-"}
          readOnly
          showEditButton={false}
        />
        <Input
          title="Telefon raqam"
          text={
            order?.billing_address?.phone ||
            order?.shipping_address?.phone ||
            order?.customer?.phone ||
            "-"
          }
          readOnly
          showEditButton={false}
        />
      </div>
      <div className="city-time-data">
        <Input
          title="Shahar"
          text={
            order?.billing_address?.city ||
            order?.shipping_address?.city ||
            order?.shipping_address?.state ||
            "-"
          }
          readOnly
          showEditButton={false}
        />
        <Input
          title="Vaqti"
          text={getDateTime(order?.created_at)}
          readOnly
          showEditButton={false}
        />
      </div>
      <div className="product-container">
        {items.length ? (
          items.map((item) => {
            const product =
              productsById[item?.product_id || item?.additional?.product_id];
            const categories = getCategoryNames(product, order);
            const image = getProductImage(product);
            const specialPrice = product?.special_price;
            const basePrice = product?.price;

            return (
              <div className="product-card" key={item.id}>
                <div className="productId-image-data">
                  <div className="productList-image">
                    <img src={image} alt={item.name} className="productId-image" />
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                    <p>ID: {item.product_id || item?.additional?.product_id || "-"}</p>
                    <p>SKU: {item.sku || "-"}</p>
                    <p>
                      Kategoriya:{" "}
                      {categories.length ? categories.join(", ") : "Topilmadi"}
                    </p>
                    <p>Miqdori: {item.qty_ordered || item.qty || 0} ta</p>
                  </div>
                </div>
                <div className="product-details">
                  {specialPrice && basePrice && specialPrice !== basePrice ? (
                    <p>
                      <del>{`${basePrice} so'm`}</del>
                    </p>
                  ) : null}
                  <p className="product-price">
                    {item.formatted_price || item.formatted_total || "-"}
                  </p>
                  <p className="maxsulot-narxi">Mahsulot narxi</p>
                  <p className="product-item-total">
                    Jami: {item.formatted_total || item.formatted_grand_total || "-"}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="product-card-empty">Mahsulotlar topilmadi.</div>
        )}

        <div className="product-position-data">
          <CheckBox title="Jarayonda" checked={statusFlags.processing} disabled />
          <CheckBox title="Yetkazib berildi" checked={statusFlags.shipping} disabled />
          <CheckBox title="Bekor qilindi" checked={statusFlags.canceled} disabled />
        </div>
      </div>

      <div className="productId-price-disCount-data">
        <Input
          title="Narxi"
          text={order?.formatted_grand_total || "-"}
          readOnly
          showEditButton={false}
        />
        <Input
          title="Chegirma"
          text={getDiscountText(order)}
          readOnly
          showEditButton={false}
        />

        <div className="select-option product-status-box">
          <h6>Mahsulot holati</h6>
          <div className="triangle-select-header product-status-readonly">
            <span className="triangle-select-title">
              {order?.status_label || order?.status || "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
