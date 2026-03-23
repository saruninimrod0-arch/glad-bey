import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    setError(""); // Clear previous errors

    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/signin", formdata);

      setLoading("");

      if (response.data.user) {
        setSuccess("Login successful!");
        navigate("/");
      } else {
        setError("Login Failed. Please try again...");
      }
    } catch (error) {
      setLoading("");
      setError("Oops, something went wrong. Try again...");
    }
  };

  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 card shadow p-4">
        <h1 className='text-primary'>Sign In</h1>

        {loading && <h5 className='text-info'>{loading}</h5>}
        {success && <h3 className='text-success'>{success}</h3>}
        {error && <h2 className='text-danger'>{error}</h2>}

        <div className="form-container">
          <p className="title">Login</p>
          {/* 1. Added onSubmit here */}
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Email</label>
              {/* 2. Added value and onChange */}
              <input 
                type="email" 
                name="email" 
                id="username" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="forgot">
                <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
              </div>
            </div>
            <button className="sign" type="submit">Sign in</button>
          </form>

          <div className="social-message">
            <div className="line"></div>
            <p className="message">Login with social accounts</p>
            <div className="line"></div>
          </div>
          <div className="social-icons">
            {/* Social buttons remain the same */}
            <button aria-label="Log in with Google" className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>
            {/* ... other buttons ... */}
          </div>
          <p className="signup">Don't have an account?
            <Link to="/signup" className=""> Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
