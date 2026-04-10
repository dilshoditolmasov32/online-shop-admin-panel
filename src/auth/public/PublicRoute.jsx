import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/token";

export default function PublicRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
}
