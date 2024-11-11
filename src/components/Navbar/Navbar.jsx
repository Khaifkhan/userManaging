import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import "./Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userFirstName, setUserFirstName] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      setUserFirstName(user.first_name);
    } else {
      setIsLoggedIn(false);
      setUserFirstName("");
    }
  }, [user]);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <NavLink to="/" className="brand-nav">
          <img src={logo} alt="" />
          <span className="brand-text">ShopEase</span>
        </NavLink>
      </div>
      <div className="nav-links">
        {isLoggedIn ? (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            {userFirstName}
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            Login/Signup
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
