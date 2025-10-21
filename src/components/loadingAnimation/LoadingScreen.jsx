import "./LoadingScreen.css"
import logo from "../../assets/images/m.svg"
const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="logo">
        <img src={logo} alt="icon" />
      </div>
    </div>
  )
}

export default LoadingScreen
