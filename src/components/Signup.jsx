import axios from "axios";
import React, { useState } from "react";
import "../css/signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://saruninimrod.alwaysdata.net/api/signup",
        {
          username,
          email,
          password,
          phone,
        }
      );

      setSuccess(response.data.message || "Signup successful!");

      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card shadow">
        <h2 className="signup-title">Create Account</h2>

        {loading && <p className="loading-text">Processing...</p>}
        {success && <p className="success-text">{success}</p>}
        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group-custom">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group-custom">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group-custom">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group-custom">
            <label>Phone</label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button
            className="signup-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="login-link">
            Already have an account? <Link to={"/signin"}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;