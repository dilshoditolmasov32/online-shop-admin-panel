import { useEffect, useState } from "react";
import hideEyeIcon from "../../assets/images/hideEyeIcon.png";
import viewEyeIcon from "../../assets/images/viewEyeIcon.png";
import "./Login.css";
import { LoadingScreen } from "../../components";
import { useNavigate } from "react-router-dom";
import { useMask } from "@react-input/mask";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [phoneValue, setPhoneValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();

  const inputRef = useMask({
    mask: "+998 (__) ___ __ __",
    replacement: { _: /\d/ },
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Kirish ma'lumotlari:", {
      phone: phoneValue,
      password: passwordValue,
    });
    navigate("/dashboard");
  
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="login-page">
          <form className="login-form" 
          // onClick={handleSubmit}
          >
            <input
              type="text"
              placeholder="Номер телефона*"
              ref={inputRef}
              value={phoneValue}
              onChange={(e) => setPhoneValue(e.target.value)}
            />

            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Пaроль*"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? viewEyeIcon : hideEyeIcon}
                  alt="eye icon"
                  width={20}
                  height={20}
                />
              </span>
            </div>

            <button
              type="button"
              id="login-btn"
              disabled={!phoneValue || !passwordValue}
              onClick={handleSubmit}
            >
              Войти
            </button>
          </form>

          <footer className="footer-title">©milliybiz</footer>
        </div>
      )}
    </>
  );
};

export default Login;
