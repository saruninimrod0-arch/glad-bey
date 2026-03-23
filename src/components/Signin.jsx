import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Please wait while we authenticate your account...");
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      const response = await axios.post(
        "https://kbenkamotho.alwaysdata.net/api/signin",
        formdata
      );

      setLoading("");

      if (response.data.user) {
        setSuccess("Login successful!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setError("Login Failed. Please try again...");
      }
    } catch (err) {
      setLoading("");
      setError("Oops, something went wrong. Try again...");
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <h2 className="signin-title">Sign In</h2>

        {loading && <p className="loading-text">{loading}</p>}
        {success && <p className="success-text">{success}</p>}
        {error && <p className="error-text">{error}</p>}

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="signin-input-group">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="signin-input-group">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <div className="forgot">
              <a href="#">Forgot Password?</a>
            </div>
          </div>

          <button className="signin-btn" type="submit">
            Sign In
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;