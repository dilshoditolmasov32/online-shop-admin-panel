import { useEffect, useRef, useState } from "react";
import CheckBox from "../checkbox/CheckBox";
import Input from "../input/Input";
import photo from "../../assets/images/photo.svg";
import "./ProductCard.css";

const ProductList = () => {
  const options = [
    { id: "1", label: "Реклама" },
    { id: "2", label: "Сделки в шоуруме" },
    { id: "3", label: "Не дозвон" },
    { id: "4", label: "Принимают решение" },
    { id: "5", label: "Успешно реализовано" },
    { id: "6", label: "Закрыто не реализовано" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="productId-data">
      <h3>Ma'lumotlar</h3>
      <div className="fullname-phone-data">
        <Input
          title={"Ism Familiya "}
          text={"Шорустамов Шохрух"}
          editData={"Готово"}
        />
        <Input title={"Telefon raqam"} text={"+998 "} editData={"Изменить"} />
      </div>
      <div className="city-time-data">
        <Input title={"Shahar"} text={"Toshkent"} editData={"Готово"} />
        <Input
          title={"Vaqti"}
          text={"01.08.2025 10:44"}
          editData={"Изменить"}
        />
      </div>
      <div className="product-container">
        <div className="product-card">
          <div className="productId-image-data">
            <div className="productList-image">
              <img src={photo} alt="Product" className="productId-image" />
            </div>
            <div>
              <h3>
                Шифоныя парта 150х80 см <span>36%</span>
              </h3>
              <p>ID: 546465451</p>
            </div>
          </div>
          <div className="product-details">
            <p>
              <del>5 900 000 so’m</del>
            </p>
            <p className="product-price">5 600 000 so'm</p>
            <p className="maxsulot-narxi">Maxsulot narxi</p>
          </div>
        </div>

        <div className="product-card">
          <div className="productId-image-data">
            <div className="productList-image ">
              <img src={photo} alt="Product" className="productId-image" />
            </div>
            <div>
              <h3>
                Шифоныя парта 150х80 см <span>36%</span>
              </h3>
              <p>ID: 546465451</p>
            </div>
          </div>
          <div className="product-details">
            <p>Maxsulot narxi:</p>
            <p className="productId-price">
              <del>5 900 000 so'm</del>
            </p>
            <h3 className="productId-discount-price">5 600 000 so’m</h3>
          </div>
        </div>

        <div className="product-position-data">
          <CheckBox title={"Jarayonda"} />
          <CheckBox title={"Yetkazib berildi"} />
          <CheckBox title={"Bekor qilindi"} />
        </div>
      </div>

      <div className="productId-price-disCount-data">
        <Input
          title={"Narxi, so’m"}
          text={"10 000 000 so’m"}
          editData={"Готовo"}
        
        />
        <Input title={"Chegirma"} text={"35%"} editData={"Изменить"} />

        <div className="select-option">
          <h6>Mahsulot holati</h6>
          <div className="triangle-select" ref={dropdownRef}>
            <div
              className={`triangle-select-header ${isOpen ? "open" : ""}`}
              onClick={toggleDropdown}
            >
              <span className="triangle-select-title">
                {selectedOption ? selectedOption.label : "Holatni tanlang"}
              </span>
              <div className={`triangle-arrow ${isOpen ? "rotated" : ""}`} />
            </div>

            {isOpen && (
              <div className="triangle-dropdown">
                <div className="triangle-dropdown-content">
                  {options.map((option) => (
                    <div
                      key={option.id}
                      className={`triangle-option ${
                        selectedOption?.id === option.id ? "selected" : ""
                      }`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
