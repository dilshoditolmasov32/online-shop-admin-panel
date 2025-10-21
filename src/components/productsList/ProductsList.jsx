import React, { useState, useEffect, memo } from "react";
import "./ProductList.css";
import Modal from "../modal/Modal";
import Loading from "../loading/Loading";
import { getProductsData } from "../../../service";

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const productListData = await getProductsData();
        setProducts(productListData?.results);
      } catch (error) {
        console.error("Productlarni olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProduct = async (element) => {
    setSelectedProductId(element);
    setOpen(true);
  };

  return (
    <>
      <div className="products-section">
        <div className="product-line"></div>
        <h3 className="product-title">#Networks.</h3>
           <Loading count={8}/>
        <div className="products">
          {loading ? (
            <Loading count={8}/>
          ) : (
            <>
              {/* {products?.map((element) => (
                <div className="product" key={element.id}>
                  <div className="product-img">
                    <img
                      src={element.images[0]}
                      alt="image"
                      className="card-image"
                    />
                  </div>
                  <div className="product-desc">{element.description.made}</div>

                  <div className="product-price">
                    {" "}
                    {element.final_price.slice(0, 7)} so'm
                  </div>
                  <div className="product-buttons">
                    <a href={"edit-product"}>
                      <button className="product-editBtn">изменить</button>
                    </a>
                    <button
                      className="product-deleteBtn"
                      onClick={() => handleDeleteProduct({ element })}
                    >
                      удалить
                    </button>
                  </div>
                </div>
              ))} */}
            </>
          )}
        </div>
      </div>

      <Modal
        open={open}
        setOpen={setOpen}
        titleText={"Вы действительно хотите удалить?"}
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
        setProducts={setProducts}
        products={products}
      />
    </>
  );
};

export default memo(ProductList);
