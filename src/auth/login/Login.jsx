import { useEffect, useState } from "react";
import hideEyeIcon from "../../assets/images/hideEyeIcon.png";
import viewEyeIcon from "../../assets/images/viewEyeIcon.png";

import "./Login.css";
import { LoadingScreen } from "../../components";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const { signIn, loading: authLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signIn({
      email: emailValue,
      password: passwordValue,
      device_name: "android",
    });
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email*"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          required
        />

        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Пароль*"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            required
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <img
              src={showPassword ? viewEyeIcon : hideEyeIcon}
              alt="toggle password"
              width={20}
              height={20}
            />
          </span>
        </div>

        <button
          type="submit"
          id="login-btn"
          disabled={!emailValue || !passwordValue || authLoading}
        >
          {authLoading ? "Загрузка..." : "Войти"}
        </button>
      </form>

      <footer className="footer-title">© milliybiz</footer>
    </div>
  );
};

export default Login;
