import axios from "axios";
import React, { useState } from "react";

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
    <div className="row justify-content-center mt-4">
      <div className="card col-md-6 shadow p-0">
        <h1 className="text-primary">Sign Up</h1>

        {loading && (
          <h5 className="text-warning">
            Please wait as registration is in progress...
          </h5>
        )}
        {success && <h3 className="text-success">{success}</h3>}
        {error && <h4 className="text-danger">{error}</h4>}

        {/* From Uiverse.io by mi-series */}
        <div className="container">
          <div className="form_area">
            <p className="title">SIGN UP</p>

            <form onSubmit={handleSubmit}>
              <div className="form_group">
                <label className="sub_title">Name</label>
                <input
                  placeholder="Enter your full name"
                  className="form_style"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form_group">
                <label className="sub_title">Email</label>
                <input
                  placeholder="Enter your email"
                  className="form_style"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form_group">
                <label className="sub_title">Password</label>
                <input
                  placeholder="Enter your password"
                  className="form_style"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form_group">
                <label className="sub_title">Phone</label>
                <input
                  placeholder="Enter your phone number"
                  className="form_style"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <button className="btn" type="submit" disabled={loading}>
                {loading ? "Signing up..." : "SIGN UP"}
              </button>

              <p>
                Have an Account? <a className="link" href="#">Login Here!</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;