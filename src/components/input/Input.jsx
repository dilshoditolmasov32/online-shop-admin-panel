import { useEffect, useState } from "react";
import { useMask } from "@react-input/mask";
import { Slide, toast } from "react-toastify";
import "./Input.css";

const toastStyle = {
  width: "100%",
  borderRadius: "30px",
  fontFamily: "Neometric",
  fontSize: "14px",
};

const showToast = (type, message) => {
  toast[type](message, {
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
      ...toastStyle,
      background: type === "success" ? "#22BB33" : "#D92D20",
    },
  });
};

const Input = ({
  title,
  text,
  initialValue,
  name,
  register,
  errors,
  type,
  editData,
  onSave,
  readOnly = false,
  showEditButton = true,
  showSuccessToast = true,
  showErrorToast = true,
  successMessage = "Ma'lumot muvaffaqiyatli o'zgartirildi",
  errorMessage = "Ma'lumotni saqlab bo'lmadi",
  savingText = "Saqlanmoqda...",
  ...props
}) => {
  const shouldMask = name === "phone" || type === "tel";
  const normalizePhoneValue = (input = "") =>
    input.toString().replace(/\D/g, "");
  const resolveValue = () => {
    const sourceValue = text ?? initialValue ?? "";
    return shouldMask ? normalizePhoneValue(sourceValue) : sourceValue;
  };

  const [value, setValue] = useState(resolveValue);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      const sourceValue = text ?? initialValue ?? "";
      setValue(
        shouldMask
          ? sourceValue.toString().replace(/\D/g, "")
          : sourceValue,
      );
    }
  }, [initialValue, isEditing, shouldMask, text]);

  const handleToggleEdit = async () => {
    if (readOnly || isSubmitting) {
      return;
    }

    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      setIsSubmitting(true);

      if (onSave) {
        await onSave(value);
      }

      if (showSuccessToast) {
        showToast("success", successMessage);
      }

      setIsEditing(false);
    } catch (error) {
      if (showErrorToast) {
        showToast(
          "error",
          error?.response?.data?.message || error?.message || errorMessage,
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const maskRef = useMask({
    mask: "+998 (__) ___ __ __",
    replacement: { _: /\d/ },
  });

  const regProps = register && name ? register(name) : {};
  const { ref: regRef, ...restRegProps } = regProps;

  const combinedRef = (el) => {
    if (shouldMask && maskRef) {
      if (typeof maskRef === "function") maskRef(el);
      else if (maskRef.current !== undefined) maskRef.current = el;
    }

    if (regRef) {
      if (typeof regRef === "function") regRef(el);
      else if (regRef.current !== undefined) regRef.current = el;
    }
  };

  const isInputDisabled = readOnly || !isEditing || isSubmitting;

  return (
    <div className="input-component">
      {title && <p>{title}</p>}

      <div className="my-input-style">
        <input
          ref={combinedRef}
          type={type}
          {...restRegProps}
          {...props}
          value={value}
          disabled={isInputDisabled}
          title="Uzgartirish uchun Izmenit tugmasini bosing"
          onChange={(e) => {
            if (restRegProps.onChange) restRegProps.onChange(e);
            setValue(e.target.value);
          }}
          onBlur={(e) => {
            if (restRegProps.onBlur) restRegProps.onBlur(e);
          }}
        />
        {errors && name && errors[name] && <p>{errors[name].message}</p>}

        {showEditButton ? (
          <button
            className={isEditing ? "activeBtn" : "editBtn"}
            type="button"
            onClick={handleToggleEdit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? savingText
              : isEditing
                ? editData || "Gotovo"
                : "Izmenit"}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Input;
