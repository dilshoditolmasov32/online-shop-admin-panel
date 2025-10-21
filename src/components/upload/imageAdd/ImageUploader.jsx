import React, { useRef, useState } from "react";
import plus from "../../../assets/images/plus.svg";
import "./ImageUploader.css";

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleAddClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="image-uploader">
      {images.map((imgSrc, index) => (
        <div className="image-box" key={index}>
          <img src={imgSrc} alt={`Uploaded ${index}`} />
        </div>
      ))}

      {images.length < 5 && (
        <div className="add-box" onClick={handleAddClick}>
          <img src={plus} alt="plus icon" />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUploader;
