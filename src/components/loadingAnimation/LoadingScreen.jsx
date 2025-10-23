import "./LoadingScreen.css";
import logo from "../../assets/images/milliyBizLogo.png";
const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="logo">
        <img src={logo} alt="logo-icon" />
      </div>
    </div>
  );
};

export default LoadingScreen;
