import { useState } from "react";
import Input from "../input/Input";
import CheckBox from "../checkbox/CheckBox";
import user from "../../assets/images/user.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../data/validationSchema";
import "./Users.css";

const Users = () => {
  const [UserImage, setUserImage] = useState(user);
  const [superVisitorRole, setSuperVisitorRole] = useState(false);
  const [marketingRole, setMarketingRole] = useState(false);
  const [menegerRole, setMenegerRole] = useState(false);
  const [calCenterRole, setCallCenterRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleChange = (role) => {
    setSelectedRole(selectedRole === role ? null : role);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log("Yuborildi:", data);
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
        qaytadi;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="user-profile-page">
        <div id="userImage-container">
          <h3>#Networks</h3>
          <div className="avatar-container">
            <img src={UserImage} alt="user image" id="user-photo" />
            <input
              type="file"
              name="photo upload"
              id="file-upload"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="user-profile-data">
          <Input
            title={"Имя фамилия"}
            text={"Одылов Мухаммад Бобур"}
            editData={"Изменить"}
            name="name"
            errors={errors}
            register={register}
          />
          <Input
            title={"Номер телефона"}
            text={"+998 90 999 99 99"}
            editData={"Изменить"}
            name="phone"
            register={register}
            errors={errors}
          />
          <h5>Должность</h5>
          <div className="user-activity">
            <CheckBox
              title={"Руководитель"}
              checked={selectedRole === "supervisor"}
              onChange={() => handleRoleChange("supervisor")}
              disabled={selectedRole !== null && selectedRole !== "supervisor"}
            />
            <CheckBox
              title={"Маркетинг"}
              checked={selectedRole === "marketing"}
              onChange={() => handleRoleChange("marketing")}
              disabled={selectedRole !== null && selectedRole !== "marketing"}
            />
            <CheckBox
              title={"Менеджер"}
              checked={selectedRole === "manager"}
              onChange={() => handleRoleChange("manager")}
              disabled={selectedRole !== null && selectedRole !== "manager"}
            />
            <CheckBox
              title={"Кaлл Центр"}
              checked={selectedRole === "callCenter"}
              onChange={() => handleRoleChange("callCenter")}
              disabled={selectedRole !== null && selectedRole !== "callCenter"}
            />
          </div>
          <Input title={"Пароль"} text={"MB2003"} editData={"Изменить"} />
        </div>
      </form>
    </>
  );
};

export default Users;
