import { useState } from "react";
import Input from "../input/Input";
import CheckBox from "../checkbox/CheckBox";
import ImageUploader from "../upload/imageAdd/ImageUploader";
import "./EditProduct.css";

const EditProduct = () => {
  const [yangi, setYangi] = useState(false);
  const [taklif, setTaklif] = useState(false);

  return (
    <form className="editProduct-page">
      <ImageUploader />
      <div className="product-name-count">
        <Input
          title={"Mahsulot"}
          text={"O’quv stol / stul 150w Grey"}
          editData={"Готово"}
          className="inpout"
        />
        <Input title={"Mahsulot"} text={"100"} editData={"Изменить"} />
      </div>

      <div className="product-title">Mahsulot ma'lumotlari</div>
      <div className="product-price">
        <Input title={"Brand"} text={"Aisha Turkey"} editData={"Готово"} />
        <Input
          title={"Material"}
          text={"Loyihangizni biz bilan birga yarating"}
          editData={"Изменить"}
        />
      </div>
      <div className="product-code">
        <Input title={"Mahsulot kodi"} text={"DC192244"} editData={"Готово"} />
        <Input
          title={"Material"}
          text={"Loyihangizni biz bilan birga yarating"}
          editData={"Изменить"}
        />
      </div>
      <div className="product-code">
        <Input
          title={"Narx, so’m"}
          text={"Loyihangizni biz bilan birga yarating  "}
          editData={"Готово"}
        />
        <Input
          title={"Chegirma"}
          text={"O’quv stol / stul 150w Grey"}
          editData={"Изменить"}
        />
      </div>

      <div className="product-state">Mahsulot holati</div>

      <div className="product-checkbox">
        <CheckBox
          title="Yangi mahsulotlar"
          checked={yangi}
          onChange={(e) => setYangi(e.target.checked)}
        />
        <CheckBox
          title="Mahsus taklif"
          checked={taklif}
          onChange={(e) => setTaklif(e.target.checked)}
        />
      </div>
    </form>
  );
};

export default EditProduct;
