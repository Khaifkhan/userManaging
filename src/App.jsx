import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/User Details/Profile";
import EditProfile from "./components/User Details/EditProfile";
import Login from "./components/userLogin/Login";
import Signup from "./components/userLogin/Signup";
import { useState, useEffect } from "react";
import Home from "./components/Home/Home";

function App() {
  const [userFirstName, setUserFirstName] = useState("");

  const handleLoginSuccess = (firstName) => {
    setUserFirstName(firstName);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user) {
      setUserFirstName(user.first_name);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        {user && (
          <>
            <Route path={`/${user.first_name}`} element={<Profile />} />
            <Route
              path={`/${user.first_name}/edit`}
              element={<EditProfile />}
            />
            <Route
              path="*"
              element={<Navigate to={`/${user.first_name}`} replace />}
            />
          </>
        )}

        {!user && <Route path="*" element={<Navigate to="/login" replace />} />}
      </Routes>
    </Router>
  );
}

export default App;
