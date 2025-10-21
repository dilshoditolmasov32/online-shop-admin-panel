import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const isAuth = localStorage.getItem("isAuth") === "true";
  return isAuth ? <Navigate to="/dashboard" replace /> : children;
}
