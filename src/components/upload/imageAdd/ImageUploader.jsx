import React, { useMemo, useRef, useState } from "react";
import plus from "../../../assets/images/plus.svg";
import "./ImageUploader.css";

const ImageUploader = ({
  items,
  onAddFiles,
  onRemoveItem,
  maxImages = 5,
}) => {
  const [internalItems, setInternalItems] = useState([]);
  const fileInputRef = useRef(null);

  const isControlled = Array.isArray(items);
  const currentItems = useMemo(
    () => (isControlled ? items : internalItems),
    [internalItems, isControlled, items],
  );

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    if (typeof onAddFiles === "function") {
      onAddFiles(files);
    } else {
      const nextItems = files.map((file, index) => ({
        id: `${file.name}-${file.size}-${index}`,
        file,
        preview: URL.createObjectURL(file),
        isPreviewUrl: true,
      }));
      setInternalItems((prev) => [...prev, ...nextItems].slice(0, maxImages));
    }

    event.target.value = "";
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (itemId) => {
    if (typeof onRemoveItem === "function") {
      onRemoveItem(itemId);
      return;
    }

    setInternalItems((prev) => {
      const nextItems = prev.filter((item) => {
        if (item.id === itemId && item.isPreviewUrl) {
          URL.revokeObjectURL(item.preview);
        }

        return item.id !== itemId;
      });

      return nextItems;
    });
  };

  return (
    <div className="image-uploader">
      {currentItems.map((item, index) => (
        <div className="image-box" key={item.id || `${item.preview}-${index}`}>
          <img src={item.preview} alt={`Uploaded ${index + 1}`} />
          <button
            type="button"
            className="image-remove-btn"
            onClick={() => handleRemove(item.id)}
          >
            x
          </button>
        </div>
      ))}

      {currentItems.length < maxImages && (
        <button type="button" className="add-box" onClick={handleAddClick}>
          <img src={plus} alt="plus icon" />
        </button>
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
