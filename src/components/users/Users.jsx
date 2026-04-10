import { useState, useEffect } from "react";
import Input from "../input/Input";
import CheckBox from "../checkbox/CheckBox";
import user from "../../assets/images/user.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../data/validationSchema";
import { useUsers } from "../../hooks/useUsers";
import "./Users.css";

const Users = () => {
  const [UserImage, setUserImage] = useState(user);
  const [selectedRole, setSelectedRole] = useState(null);
  const { users, loading } = useUsers({ limit: 1 }, true);
  const [currentUser, setCurrentUser] = useState(null);
  
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
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (users && users.length > 0) {
      setCurrentUser(users[0]);
      if (users[0]?.role) {
        setSelectedRole(users[0].role);
      }
    }
  }, [users]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="user-profile-page">
        <div id="userImage-container">
          <h3>#Networks</h3>
          <div className="avatar-container">
            <img
              src={currentUser?.avatar || UserImage}
              alt="user image"
              id="user-photo"
            />
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
            text={currentUser?.name || currentUser?.full_name || ""}
            editData={"Изменить"}
            name="name"
            errors={errors}
            register={register}
          />
          <Input
            title={"Номер телефона"}
            text={currentUser?.phone || ""}
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
          <Input
            title={"Пароль"}
            text={currentUser?.password || ""}
            editData={"Изменить"}
          />
        </div>
      </form>
    </>
  );
};

export default Users;
