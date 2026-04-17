import { useState, useEffect } from "react";
import Input from "../input/Input";
import CheckBox from "../checkbox/CheckBox";
import user from "../../assets/images/user.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../data/validationSchema";
import { useUsers } from "../../hooks/useUsers";
import { useRoles } from "../../hooks/useRoles";
import { LoadingScreen } from "../index";
import "./Users.css";

const Users = () => {
  const [UserImage, setUserImage] = useState(user);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    users,
    loading: usersLoading,
    isSubmitting,
    updateUser,
  } = useUsers({}, true);
  const { roles, loading: rolesLoading } = useRoles({}, true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (users && users.length > 0) {
      const firstUser = users[0];
      setCurrentUser(firstUser);
      setSelectedRoleId(firstUser?.role_id || null);

      // Pre-fill form
      setValue("name", firstUser?.name || firstUser?.full_name || "");
      setValue("email", firstUser?.email || "");
      setValue("phone", firstUser?.phone || "");

      if (firstUser?.avatar) {
        setUserImage(firstUser.avatar);
      }
    }
  }, [users, setValue]);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserImage(reader.result);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error processing avatar:", error);
      }
    }
  };

  const handleRoleChange = (roleId) => {
    setSelectedRoleId(selectedRoleId === roleId ? null : roleId);
  };

  const onSubmit = async (data) => {
    if (!currentUser) {
      console.error("No user selected");
      return;
    }

    try {
      const updateData = {
        ...data,
        role_id: selectedRoleId,
      };

      await updateUser(currentUser.id, updateData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (usersLoading || rolesLoading) {
    return <h1>Yuklanmoqda</h1>;
  }

  if (!currentUser) {
    return <div className="user-profile-page">No users available</div>;
  }

  return (
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
            onChange={handleAvatarChange}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="user-profile-data">
        <Input
          title="Имя фамилия"
          text={watch("name")}
          editData="Изменить"
          name="name"
          errors={errors}
          register={register}
          disabled={!isEditing}
        />
        <Input
          title="Email"
          text={watch("email")}
          type="email"
          editData="Изменить"
          name="email"
          errors={errors}
          register={register}
          disabled={!isEditing}
        />
        <Input
          title="Номер телефона"
          text={watch("phone")}
          editData="Изменить"
          name="phone"
          register={register}
          errors={errors}
          disabled={!isEditing}
        />

        <div>
          <h5>Должность</h5>
          <div className="user-activity">
            {roles?.map((role) => (
              <CheckBox
                key={role.id}
                title={role.name}
                checked={selectedRoleId === role.id}
                onChange={() => handleRoleChange(role.id)}
                disabled={
                  !isEditing ||
                  (selectedRoleId !== null && selectedRoleId !== role.id)
                }
              />
            ))}
          </div>
        </div>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: "10px 20px",
                  backgroundColor: isSubmitting ? "#ccc" : "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default Users;
