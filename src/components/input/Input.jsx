import { useState } from "react";
import { Slide, toast } from "react-toastify";
import "./Input.css";
import { useMask } from "@react-input/mask";

const Input = ({
  title,
  text,
  name,
  register,
  errors,
  type = "text",
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


     const inputRef =
    type === "tel" || name === "phone"
      ? useMask({
          mask: "+998 (__) ___-__-__",
          replacement: { _: /\d/ },
        })
      : null;

  return (
    <>
      <form className="input-component" id="myForm">
        {title && <p>{title}</p>}

        <div className="my-input-style">
          <input
          // ref={inputRef}
            type={type}
            {...(register && name ? register(name) : {})}
            {...props}
            value={value}
            disabled={!isEditing}
            title="Uzgartirish uchun Изменить tugmasini bosing"
            onChange={(e) => setValue(e.target.value)}
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
    </>
  );
};

export default Input;
