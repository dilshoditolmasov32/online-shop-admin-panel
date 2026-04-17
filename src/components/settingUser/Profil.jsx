import "./Profil.css";
import user from "../../assets/images/user.svg";
import Input from "../input/Input";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useProfile } from "../../hooks/useProfile";
import { LoadingScreen } from "../index";

const profileSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
});

const Profil = () => {
  const { profile, loading, isUpdating, updateProfile, uploadAvatar } =
    useProfile(true);
  const [uploadImage, setUploadImage] = useState(user);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Update form values when profile is loaded
  useEffect(() => {
    if (profile) {
      setValue("name", profile?.name || profile?.full_name || "");
      setValue("email", profile?.email || "");
      setValue("phone", profile?.phone || "");

      if (profile?.avatar) {
        setUploadImage(profile.avatar);
      }
    }
  }, [profile, setValue]);

  const handleUploadPhoto = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Show preview immediately
        const imageUrl = URL.createObjectURL(file);
        setUploadImage(imageUrl);

        // Upload to server
        await uploadAvatar(file);
      } catch (error) {
        console.error("Failed to upload avatar:", error);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="profil-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="profil-photo">
          <h3>#Networks</h3>
          <div className="profilImg-container">
            <img src={uploadImage} alt="profile img" id="profil-img" />
            <input
              type="file"
              name="photo upload"
              id="photo-upload"
              accept="image/*"
              onChange={handleUploadPhoto}
              disabled={isUpdating}
            />
          </div>
        </div>
        <div className="profil-data">
          <Input
            title="Имя фамилия"
            text={watch("name")}
            type="text"
            name="name"
            register={register}
            errors={errors}
            editData="Изменить"
          />
          <Input
            title="Email"
            text={watch("email")}
            type="email"
            name="email"
            register={register}
            errors={errors}
            editData="Изменить"
          />
          <Input
            title="Номер телефона"
            text={watch("phone")}
            type="tel"
            name="phone"
            register={register}
            errors={errors}
            editData="Изменить"
          />
          <Input
            title="Должность"
            text={profile?.role?.name || ""}
            type="text"
            disabled
          />
          <button
            type="submit"
            disabled={isUpdating}
            style={{
              padding: "10px 20px",
              marginTop: "20px",
              backgroundColor: isUpdating ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isUpdating ? "not-allowed" : "pointer",
            }}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profil;
