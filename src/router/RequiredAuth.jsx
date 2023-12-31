import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../shared/Spinner";
import { useEffect, useState } from "react";

const RequiredAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    setTimeout(() => setWaiting(false), 3000);
  }, []);

  if (waiting) {
    return <Spinner />;
  } else {
    if (loading) {
      return <Spinner />;
    } else if (user) {
      return children;
    } else {
      return <Navigate to="/auth" />;
    }
  }
};

export default RequiredAuth;
