import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../shared/Spinner";

const RequiredAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  } else if (user) {
    return children;
  } else {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
};

export default RequiredAuth;
