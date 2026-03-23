import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = () => {
  const location = useLocation()

  const styles = {
    nav: {
      background: 'linear-gradient(90deg, #0d6efd, #6610f2)',
      padding: '10px 0'
    },
    link: {
      color: '#fff',
      marginRight: '15px',
      textDecoration: 'none',
      position: 'relative',
      transition: '0.3s'
    },
    active: {
      borderBottom: '2px solid #fff'
    }
  }

  return (
    <nav className="navbar navbar-expand-lg" style={styles.nav}>
      <div className="container">
       
        {/* Brand */}
        <Link className="navbar-brand text-white fw-bold" to="/">
          Fashions
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="ms-auto">

            <Link
              to="/"
              style={{
                ...styles.link,
                ...(location.pathname === '/' ? styles.active : {})
              }}
              className="nav-link d-inline-block"
            >
              Home
            </Link>

            <Link
              to="/addproducts"
              style={{
                ...styles.link,
                ...(location.pathname === '/addproducts' ? styles.active : {})
              }}
              className="nav-link d-inline-block"
            >
              Add Products
            </Link>

       

            <Link
              to="/signin"
              style={{
                ...styles.link,
                ...(location.pathname === '/signin' ? styles.active : {})
              }}
              className="nav-link d-inline-block"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              style={{
                ...styles.link,
                ...(location.pathname === '/signup' ? styles.active : {})
              }}
              className="nav-link d-inline-block"
            >
              Sign Up
            </Link>

          </div>
        </div>
      </div>

      {/* Extra Animation Styling */}
      <style>
        {`
          .nav-link:hover {
            color: #ffd700 !important;
            transform: translateY(-2px);
          }
        `}
      </style>
    </nav>
  )
}

export default Navbar