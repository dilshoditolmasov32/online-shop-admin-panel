import { useState, useRef } from "react";
import "./Image.css";
import uploadIcon from "../../assets/images/uploadImage.svg";

const Image = ({ numbers }) => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleOverlayClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="product-photo">
      <div className="upload-image">
        <div className="product-image">
          {image ? (
            <img src={image} alt="uploaded" className="uploaded-img" />
          ) : (
            <div className="cardPosition-number">
              <span className="cardNumber">{numbers + 1}</span>
            </div>
          )}

          <div className="image-hover" onClick={handleOverlayClick}>
            <div className="image-loading">
              <img src={uploadIcon} alt="upload icon" />
            </div>
            <p className="faylUpload-text">Загрузите ваш файл здесь</p>
          </div>

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default Image;
