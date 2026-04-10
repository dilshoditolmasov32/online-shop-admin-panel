import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/token";

export default function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}
