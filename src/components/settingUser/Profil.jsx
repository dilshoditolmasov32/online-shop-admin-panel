import "./Profil.css";
import user from "../../assets/images/user.svg";
import Input from "../input/Input";
import { useState } from "react";

const Profil = () => {
  const [uploadImage, setUploadImage] = useState(user);
  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadImage(imageUrl);
    }
  };

  return (
    <div className="profil-page">
      <div className="profil-photo">
        <h3>#Networks</h3>
        <div className="profilImg-container">
          <img src={uploadImage} alt="profile img" id="profil-img" />
          <input
            type="file"
            name="photo upload"
            id="photo-upload"
            onChange={handleUploadPhoto}
          />
        </div>
      </div>
      <div className="profil-data">
        <Input
          text={"Одылов Мухаммад Бобур"}
          title="Имя фамилия"
          type={"text"}
        />
        <Input text={"+998 90 999 99 99"} title="Номер телефона" type={"tel"} />
        <Input text={"Руководитель"} title="Должность" type={"text"} />
        <Input text={"MB2003"} title="Пароль" type={"text"} />
      </div>
    </div>
  );
};

export default Profil;
