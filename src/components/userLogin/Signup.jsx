import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { validateForm } from "../../validations/formValidation";

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) return;

    setIsLoading(true);
    setSuccessMessage("");

    try {
      await axios.post("https://demo-practice.onrender.com/register", formData);
      setIsLoading(false);
      setSuccessMessage("Account successfully created!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.error("Registration error: ", error);
      setSuccessMessage(
        "An error occurred during registration. Please try again."
      );
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="First name"
              name="first_name"
              disabled={isLoading}
              value={formData.first_name}
              onChange={handleChange}
            />
            {errors.first_name && (
              <p className="form-error-message">{errors.first_name}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Last name"
              name="last_name"
              disabled={isLoading}
              value={formData.last_name}
              onChange={handleChange}
            />
            {errors.last_name && (
              <p className="form-error-message">{errors.last_name}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              name="email"
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="form-error-message">{errors.email}</p>
            )}
          </div>

          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-input"
              placeholder="Password"
              name="password"
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="form-error-message">{errors.password}</p>
            )}
            <i
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </i>
          </div>

          <div className="form-group password-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-input"
              placeholder="Confirm password"
              name="confirmPassword"
              disabled={isLoading}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="form-error-message">{errors.confirmPassword}</p>
            )}
            <i
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </i>
          </div>

          <div className="form-group">
            <button type="submit" className="form-submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>

          {successMessage && !isLoading && (
            <div id="success-message">{successMessage}</div>
          )}
        </form>

        <p className="reg-navigate">
          Already have an account?
          <Link className="log-link" to="/login">
            Login
          </Link>
        </p>

        {isLoading && (
          <div id="loader-overlay">
            <div id="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
