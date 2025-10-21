import { useState, useRef } from "react";
import "./UploadBanner.css";

const UploadBanner = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [mobileSelectedImage, setMobileSelectedImage] = useState(null);
  const [desktopButtonValue, setDesktopButtonValue] = useState("Прикрепить");
  const [mobileButtonValue, setMobileButtonValue] = useState("Прикрепить");

  const desktopFileInputRef = useRef(null);
  const mobileFileInputRef = useRef(null);

  const handleDesktopChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const desktopImage = URL.createObjectURL(file);
      setSelectedImage(desktopImage);
      setDesktopButtonValue("Изменить");
    }
  };
  const handleMobileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const mobileImage = URL.createObjectURL(file);
      setMobileSelectedImage(mobileImage);
      setMobileButtonValue("Изменить");
    }
  };

  const handleDesktopClick = () => {
    desktopFileInputRef.current.click();
  };

  const handleMobileClick = () => {
    mobileFileInputRef.current.click();
  };
  return (
    <>
      <form className="banner-component">
        <div
          className="desctopMobile-component"
        >
          <div className="banner-box">
            <input
              type="file"
              id="desktop-upload-image"
              ref={desktopFileInputRef}
              onChange={handleDesktopChange}
              style={{
                display: "none",
              }}
            />

            {selectedImage ? (
              <img src={selectedImage} alt="desktop" className="desktop-img" />
            ) : (
              <>
                <div className="position-number">
                  <span className="number-one">1</span>
                </div>
                <p>1460×548 px</p>
              </>
            )}
          </div>
          <div className="banner-box">
            <input
              type="file"
              id="mobile-upload-image"
              ref={mobileFileInputRef}
              onChange={handleMobileChange}
              style={{
                display: "none",
              }}
            />

            {mobileSelectedImage ? (
              <img
                src={mobileSelectedImage}
                alt="mobile"
                className="mobile-img"
              />
            ) : (
              <>
                <div className="position-number">
                  <span className="number-two">2</span>
                </div>
                <p>320×296 px</p>
              </>
            )}
          </div>
        </div>
        <div className="buttons">
          <div className="desktop-submit-btn">
            <span>Desktop version</span>
            <button type="button" onClick={handleDesktopClick} id="edit-button">
              {desktopButtonValue}
            </button>
          </div>
          <div className="mobile-submit-btn">
            <span>Mobil version</span>
            <button type="button" onClick={handleMobileClick} id="save-button">
              {mobileButtonValue}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UploadBanner;
