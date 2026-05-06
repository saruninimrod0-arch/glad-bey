import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#f00f71',
      color: '#fff',
      padding: '40px 0',
      width: '80%', 
      maxWidth: '1000px',
      margin: '50px auto 20px auto', 
      borderRadius: '15px'
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
              <button className="btn btn-primary btn-sm w-100" style={{backgroundColor: '#fff', color: '#f00f71', border: 'none', fontWeight: 'bold'}}>
                Send
              </button>
            </form>
          </div>

          {/* Social Media with Logos */}
          <div className="col-md-4">
            <h5 style={styles.heading}>Follow Us</h5>
            <a href="#" style={styles.link}>
              <i className="fab fa-facebook" style={styles.icon}></i> Facebook
            </a>
            <a href="#" style={styles.link}>
              <i className="fab fa-twitter" style={styles.icon}></i> Twitter
            </a>
            <a href="#" style={styles.link}>
              <i className="fab fa-instagram" style={styles.icon}></i> Instagram
            </a>
          </div>

        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.3)' }} />

        <p className="text-center mb-0" style={{ fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Our Company.
        </p>
      </div>
    </footer>
  )
}

export default Footer
