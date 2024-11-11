import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setIsLoggedIn(false);
      navigate("/login");
      return;
    }

    setUserData(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    setUserData(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return isLoggedIn && userData ? (
    <div className="profile-container">
      <h1>Profile Page</h1>
      <div className="profile-info">
        <p>
          <strong>First Name:</strong> {userData.first_name}
        </p>
        <p>
          <strong>Last Name:</strong> {userData.last_name}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
      </div>
      <div className="profile-actions">
        <Link className="edit-link" to={`/${userData.first_name}/edit`}>
          <button>Edit Details</button>
        </Link>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  ) : (
    <div id="loader"></div>
  );
}

export default Profile;
