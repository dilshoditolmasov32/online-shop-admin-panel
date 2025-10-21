import { useState } from "react";
import check from "../../assets/images/check.svg";
import "./CheckBox.css";

const CheckBox = ({ title, checked, defaultChecked, onChange, disabled }) => {
    console.log(title, 'disabled:', disabled); // bu qatorni qo'shing
  const [internalChecked, setInternalChecked] = useState(
    defaultChecked || false
  );

  const isControlled = checked !== undefined;
  const value = isControlled ? checked : internalChecked;

  const handleChange = (e) => {
    if (disabled) return;
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  const uniqueId = `checkbox-${title.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div  className={`custom-checkbox-selector ${disabled ? 'disabled' : ''}`}>
      <span className="checkbox-label">{title}</span>
      <label className="checkbox-wrapper" htmlFor={uniqueId}>
        <input
          id={uniqueId}
          type="checkbox"
          className="custom-checkbox"
          checked={value}
          onChange={handleChange}
          disabled={disabled}
        />
        {value && (
          <img
            src={check}
            alt="check icon"
            className="check-icon"
            aria-hidden="true"
          />
        )}
      </label>
    </div>
  );
};

export default CheckBox;
