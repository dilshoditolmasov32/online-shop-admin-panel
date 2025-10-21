import UploadBanner from "../banner/UploadBanner";
import Input from "../input/Input";
import "./UploadCard.css";

const UploadCard = () => {
  return (
    <>
      <div className="upload-card-component">
        <div className="cardBanner-page-data">
          <Input
            title={"Главный текст"}
            text={"Loyihangizni biz bilan birga yarating"}
            editData={"Изменить"}
          />
          <Input
            title={"Подтекст"}
            text={"Loyihangizni biz bilan birga yarating"}
            editData={" Готово"}
          />
        </div>

        <UploadBanner />
      </div>
    </>
  );
};

export default UploadCard;
