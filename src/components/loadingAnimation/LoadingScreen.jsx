import "./LoadingScreen.css";
import logo from "../../assets/images/milliyBizLogo.png";
const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="logo">
        <img src={logo} alt="logo-icon" width={100} height={100} />
      </div>
    </div>
  );
};

export default LoadingScreen;
