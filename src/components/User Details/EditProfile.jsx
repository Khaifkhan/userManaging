import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../userLogin/Login.css";

function EditProfile() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [email] = useState(userData.email);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isFormChanged =
    firstName !== userData.first_name || lastName !== userData.last_name;

  const handleEdit = async (e) => {
    e.preventDefault();

    console.log("Updating with:", { firstName, lastName });

    setLoading(true);

    try {
      const response = await axios.put(
        `https://demo-practice.onrender.com/edit/${email}`,
        { first_name: firstName, last_name: lastName },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response from server: ", response.data);

      if (response.data.message === "User data updated successfully") {
        console.log("Update successful!");

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userData,
            first_name: firstName,
            last_name: lastName,
          })
        );

        navigate("/profile");
      } else {
        console.error("Error in response:", response.data);
        alert("Update failed: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error during update: ", error);
      alert("Update failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h2>Edit Profile</h2>
        <form className="edit-profile-form" onSubmit={handleEdit}>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="First name"
              name="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Last name"
              name="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input type="email" className="form-input" value={email} disabled />
          </div>
          <div className="edit-actions">
            <button
              type="submit"
              className="save-form"
              disabled={!isFormChanged || loading}
            >
              {loading ? <div id="loader"></div> : "Save Changes"}
            </button>
            <button
              type="button"
              className="cancel-form"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
