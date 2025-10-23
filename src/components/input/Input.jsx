import { useState } from "react";
import { useMask } from "@react-input/mask";
import { Slide, toast } from "react-toastify";
import "./Input.css";

const Input = ({
  title,
  text,
  name,
  register,
  errors,
  type,
  buttonLabel,
  onButtonClick,
  ...props
}) => {
  const [value, setValue] = useState(text || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => {
    if (isEditing) {
      toast.success("Ma'lumot muvaffaqiyatli o‘zgartirildi", {
        position: "bottom-right",
        autoClose: 909,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        style: {
          width: "100%",
          background: "#22BB33",
          borderRadius: "30px",
          fontFamily: "Neometric",
          fontSize: "14px",
        },
      });
    }

    setIsEditing(!isEditing);
  };

 
  const maskRef = (name === "phone" || type === "tel")
    ? useMask({
        mask: "+998 (__) ___ __ __",
        replacement: { _: /\d/ },
      })
    : null;

  // react-hook-form register() ning qaytargan ob'yektini olish
  const regProps = register && name ? register(name) : {};
  // register ob'yektidan refni ajratib olamiz — bizga merge qilish uchun kerak bo'ladi
  const { ref: regRef, ...restRegProps } = regProps;

  // bitta callback ref orqali maskRef va register.ref ni birlashtiramiz
  const combinedRef = (el) => {
    // agar useMask callback/ref bo'lsa uni chaqiramiz yoki currentga yozamiz
    if (maskRef) {
      if (typeof maskRef === "function") maskRef(el);
      else if (maskRef.current !== undefined) maskRef.current = el;
    }

    // registerning refini ham chaqiramiz / o'rnatamiz
    if (regRef) {
      if (typeof regRef === "function") regRef(el);
      else if (regRef.current !== undefined) regRef.current = el;
    }
  };

  return (
    <form className="input-component" id="myForm" onSubmit={(e)=>e.preventDefault()}>
      {title && <p>{title}</p>}

      <div className="my-input-style">
        <input
          // merge qilingan ref
          ref={combinedRef}
          type={type}
          // register dan olingan onChange/onBlur/name va boshqa propslarni qo'shamiz
          {...restRegProps}
          {...props}
          value={value}
          disabled={!isEditing}
          title="Uzgartirish uchun Изменить tugmasini bosing"
          onChange={(e) => {
            // agar react-hook-form ishlatayotgan bo'lsa, register() ga oid onChange ni chaqirish mumkin,
            // lekin biz bu yerda qiymatni ham local state ga yozamiz:
            if (restRegProps.onChange) restRegProps.onChange(e);
            setValue(e.target.value);
          }}
          onBlur={(e) => {
            if (restRegProps.onBlur) restRegProps.onBlur(e);
          }}
        />
        {errors && name && errors[name] && <p>{errors[name].message}</p>}

        <button
          className={isEditing ? "activeBtn" : "editBtn"}
          type="button"
          onClick={handleToggleEdit}
        >
          {isEditing ? "Готово" : "Изменить"}
        </button>
      </div>
    </form>
  );
};

export default Input;
