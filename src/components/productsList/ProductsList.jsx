import React, { useCallback, useMemo, useState, memo, Children } from "react";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { useProducts } from "../../hooks/useProducts";
import "./ProductList.css";
import Modal from "../modal/Modal";
import Loading from "../loading/Loading";

const toastConfig = {
  position: "bottom-right",
  autoClose: 909,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  transition: Slide,
  style: {
    width: "100%",
    borderRadius: "30px",
    fontFamily: "Neometric",
    fontSize: "14px",
  },
};

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { products, loading, deleteProduct } = useProducts();
console.log(products)
  const selectedProduct = useMemo(
    () => products?.find((product) => product.id === selectedProductId),
    [products, selectedProductId],
  );

  const handleDeleteProduct = useCallback((productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedProductId) {
      return;
    }

    try {
      await deleteProduct(selectedProductId);
      toast.success("Tovar muvaffaqiyatli o'chirildi", toastConfig);
      setSelectedProductId(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Tovarni o'chirib bo'lmadi",
        toastConfig,
      );
      throw error;
    }
  }, [deleteProduct, selectedProductId]);

  return (
    <>
      <div className="products-section">
        <div className="product-line"></div>
        <h3 className="product-title">#Networks.</h3>
        <div className="products">
          {loading ? (
            <Loading count={8} />
          ) : (
            <>
              {products?.map((element) => (
                <div className="product" key={element.id}>
                  <div
                    className="product-img"
                    onMouseEnter={(e) => {
                      const imgs = element.images || [];
                      if (imgs.length > 1) {
                        e.currentTarget.dataset.index = "1";
                        e.currentTarget.querySelector("img").src =
                          imgs[1]?.original_image_url;
                      }
                    }}
                    onMouseLeave={(e) => {
                      const imgs = element.images || [];
                      e.currentTarget.dataset.index = "0";
                      if (imgs.length > 0) {
                        e.currentTarget.querySelector("img").src =
                          imgs[0]?.original_image_url;
                      }
                    }}
                  >
                    {element.images?.length > 0 && (
                      <img
                        src={element.images[0]?.original_image_url}
                        alt="image"
                        className="card-image"
                      />
                    )}

                    {/* dots */}
                    {element.images?.length > 1 && (
                      <div className="dots">
                        {element.images.map((img, i) => (
                          <span
                            key={i}
                            className="dot"
                            onClick={(e) => {
                              const parent =
                                e.currentTarget.closest(".product-img");
                              parent.querySelector("img").src =
                                img.original_image_url;
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    className="product-desc"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(element.description || ""),
                    }}
                  />

                  <div className="product-price">
                    {String(element.price || "").slice(0, 7)}
                    so'm
                  </div>

                  <div className="product-buttons">
                    <Link
                      to={`/dashboard/warehouse/edit-product/${element.id}`}
                    >
                      <button type="button" className="product-editBtn">
                        изменить
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="product-deleteBtn"
                      onClick={() => handleDeleteProduct(element.id)}
                    >
                      удалить
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <Modal
        open={open}
        setOpen={setOpen}
        titleText={`${
          selectedProduct?.name || selectedProduct?.description || "Mahsulot"
        } ni o'chirmoqchimisiz?`}
        confirmText="O'chirish"
        cancelText="Bekor qilish"
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default memo(ProductList);
