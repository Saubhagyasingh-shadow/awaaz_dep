import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation.jsx';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';
import Room from './pages/Room/Room';

const GuestRoute = ({ children }) => {
    const { isAuth } = useSelector((state) => state.auth);
    return isAuth ? <Navigate to="/rooms" replace /> : children;
};

const SemiProtectedRoute = ({ children }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    if (!isAuth) {
        return <Navigate to="/" replace />;
    }
    if (isAuth && !user.activated) {
        return children;
    }
    return <Navigate to="/rooms" replace />;
};

const ProtectedRoute = ({ children }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    if (!isAuth) {
        return <Navigate to="/" replace />;
    }
    if (isAuth && !user.activated) {
        return <Navigate to="/activate" replace />;
    }
    return children;
};

function App() {
  const { loading } = useLoadingWithRefresh();

  return loading ? (
      <Loader message="Loading, please wait.." />
      // <h1>Loading</h1>
  ) : (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<GuestRoute><Home /></GuestRoute>} />
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/register" element={<Register />} /> */}
                <Route path="/authenticate" element={<GuestRoute><Authenticate /></GuestRoute>} />
                <Route path="/activate" element={<SemiProtectedRoute><Activate /></SemiProtectedRoute>} />
                <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
                <Route path="/room/:id" element={<ProtectedRoute><Room /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>)
    ;
}

export default App;
