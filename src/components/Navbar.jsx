import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ShoppingBag, Home, PlusCircle, LogIn, UserPlus, Menu, X } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/addproducts', label: 'Add Products', icon: PlusCircle },
    { path: '/signin', label: 'Sign In', icon: LogIn },
    { path: '/signup', label: 'Sign Up', icon: UserPlus },
  ]

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-lg" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease'
    }}>
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand text-white fw-bold d-flex align-items-center"
          to="/"
          style={{
            fontSize: '1.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)'
            e.target.style.color = '#ffd700'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'
            e.target.style.color = '#fff'
          }}
        >
          <ShoppingBag className="me-2" size={32} />
          <span className="text-gradient">Glad-Bey</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ background: 'transparent' }}
        >
          {isMenuOpen ? (
            <X className="text-white" size={24} />
          ) : (
            <Menu className="text-white" size={24} />
          )}
        </button>

        {/* Links */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <div className="ms-auto d-flex flex-column flex-lg-row align-items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link d-flex align-items-center px-3 py-2 rounded-lg text-decoration-none transition-all duration-300 ${isActive
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white hover:bg-white/10 hover:text-yellow-300'
                    }`}
                  style={{
                    transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: isActive ? '0 4px 15px rgba(0,0,0,0.2)' : 'none'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={18} className="me-2" />
                  <span className="fw-medium">{item.label}</span>
                  {isActive && (
                    <div className="ms-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Animation Styling */}
      <style jsx>{`
        .nav-link {
          position: relative;
          overflow: hidden;
        }
        
        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .nav-link:hover::before {
          left: 100%;
        }
        
        @keyframes slideInFromTop {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .navbar {
          animation: slideInFromTop 0.5s ease-out;
        }
      `}</style>
    </nav>
  )
}

export default Navbar