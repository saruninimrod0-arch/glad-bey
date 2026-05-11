import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Footer = () => {
  const styles = {
    footer: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #fda085 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      color: '#fff',
      padding: '40px 0',
      width: '80%',
      maxWidth: '1000px',
      margin: '50px auto 20px auto',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      position: 'relative',
      overflow: 'hidden'
    },
    heading: {
      marginBottom: '15px'
    },
    input: {
      marginBottom: '10px'
    },
    link: {
      color: '#fff', // Changed to white for better visibility
      textDecoration: 'none',
      display: 'block',
      marginBottom: '8px',
      fontSize: '0.9rem'
    },
    icon: {
      marginRight: '10px',
      width: '20px' // Keeps text aligned
    }
  }

  return (
    <footer style={styles.footer}>
      <div className="container">
        <div className="row">

          {/* About Us */}
          <div className="col-md-4">
            <h5 style={styles.heading}>About Us</h5>
            <p style={{ fontSize: '0.9rem' }}>
              We are a passionate team dedicated to building modern web applications.
            </p>
          </div>

          {/* Contact Form */}
          <div className="col-md-4">
            <h5 style={styles.heading}>Contact Us</h5>

            {/* Phone Number */}
            <div style={{ fontSize: '0.9rem', marginBottom: '15px' }}>
              <strong style={{ color: '#fff' }}> 📞 0785816800</strong>
            </div>

            {/* Delivery Information */}
            <div style={{ fontSize: '0.9rem', marginBottom: '15px' }}>
              <strong style={{ color: '#fff' }}> 🚗We deliver countrywide</strong>
            </div>

            <form>
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Enter email"
                style={styles.input}
              />
              <textarea
                className="form-control form-control-sm"
                rows="2"
                placeholder="Your message"
                style={styles.input}
              ></textarea>
              <button className="btn btn-primary btn-sm w-100" style={{ backgroundColor: '#e8e10f', color: '#f00f71', border: 'none', fontWeight: 'bold' }}>
                Send
              </button>
            </form>
          </div>

          {/* Social Media with Logos */}
          <div className="col-md-4">
            <h5 style={styles.heading}>Follow Us</h5>
            <a
              href="https://www.facebook.com/gladee.bey?mibextid=rS40aB7S9Ucbxw6v"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              <span style={{
                color: '#1877F2',
                fontSize: '1.8rem',
                display: 'inline-block',
                transform: 'scale(1.2)',
                marginRight: '8px'
              }}>📘</span> Facebook
            </a>
            <a href="#" style={styles.link}>
              <span style={{
                color: '#1DA1F2',
                fontSize: '1.8rem',
                display: 'inline-block',
                transform: 'scale(1.2)',
                marginRight: '8px'
              }}>🕊️</span> Twitter
            </a>
            <a
              href="https://www.instagram.com/glee_collection_s?igsh=OXA0eGtnM3hmdHhy"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              <span style={{
                color: '#E4405F',
                fontSize: '1.8rem',
                display: 'inline-block',
                transform: 'scale(1.2)',
                marginRight: '8px'
              }}>📷</span> Instagram
            </a>
            <a
              href="https://wa.me/254785816800"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              <span style={{
                color: '#25D366',
                fontSize: '1.8rem',
                display: 'inline-block',
                transform: 'scale(1.2)',
                marginRight: '8px',
                textShadow: '0 0 15px rgba(37, 211, 102, 0.8)',
                filter: 'brightness(1.5) saturate(1.5)',
                backgroundColor: 'rgba(37, 211, 102, 0.1)',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>💬</span> WhatsApp
            </a>
          </div>

        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.3)' }} />

        {/* Moving Text */}
        <div style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '10px 0',
          marginBottom: '10px',
          borderRadius: '5px'
        }}>
          <div style={{
            display: 'inline-block',
            animation: 'marquee 15s linear infinite',
            fontSize: '0.9rem',
            color: '#fff',
            fontWeight: 'bold'
          }}>
            🛒 Thanks for buying with us! 🛒 Thanks for buying with us! 🛒 Thanks for buying with us! 🛒 Thanks for buying with us! 🛒 Thanks for buying with us! 🛒
          </div>
        </div>

        <p className="text-center mb-0" style={{ fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Our Company.
        </p>

        {/* CSS for marquee and gradient animations */}
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    </footer>
  )
}

export default Footer
