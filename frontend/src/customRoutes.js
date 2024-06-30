import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <Navigate to="/rooms" /> : children;
};

const SemiProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  if (!isAuth) {
    return <Navigate to="/" />;
  }
  if (isAuth && !user.activated) {
    return children;
  }
  return <Navigate to="/rooms" />;
};

const ProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  if (!isAuth) {
    return <Navigate to="/" />;
  }
  if (isAuth && !user.activated) {
    return <Navigate to="/activate" />;
  }
  return children;
};

export { GuestRoute, SemiProtectedRoute, ProtectedRoute };
