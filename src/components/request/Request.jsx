import UploadBanner from "../banner/UploadBanner";
import Input from "../input/Input";
import "./Request.css";

const Request = () => {
  return (
    <div className="request-selector">
      <div className="request-page">
        <Input
          title={"Главный текст"}
          text={"Ariza qoldiring."}
          editData={"Изменить"}
        />
        <Input
          title={"Подтекст"}
          text={"So'rov qoldiring va bizning mutaxassislarimiz .."}
          editData={"Готово"}
        />
      </div>
      <UploadBanner />
    </div>
  );
};

export default Request;
