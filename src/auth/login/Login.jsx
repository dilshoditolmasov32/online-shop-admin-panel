import { useEffect, useState } from "react";
import hideEyeIcon from "../../assets/images/hideEyeIcon.png";
import viewEyeIcon from "../../assets/images/viewEyeIcon.png";

import "./Login.css";
import { LoadingScreen } from "../../components";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("navigate");
    if (phone && password) {
      localStorage.setItem("isAuth", "true")
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="login-page">
          <form className="login-form">
            <input
              type="text"
              placeholder="Номер телефона*"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Пaроль*"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <img
                    src={viewEyeIcon}
                    alt="hide eye icon"
                    width={20}
                    height={20}
                  />
                ) : (
                  <img
                    src={hideEyeIcon}
                    alt="view eye icon"
                    width={20}
                    height={20}
                  />
                )}
              </span>
            </div>
            <button
              type="submit"
              id="login-btn"
              disabled={!phone || !password}
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
