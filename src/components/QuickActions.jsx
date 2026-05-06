import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, PlusCircle, UserPlus, LogIn, ChevronUp, Menu } from 'lucide-react';

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  // Show scroll-to-top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickActions = [
    { path: '/', icon: Home, label: 'Home', color: 'from-purple-600 to-purple-700' },
    { path: '/', icon: Package, label: 'Products', color: 'from-blue-600 to-blue-700' },
    { path: '/addproducts', icon: PlusCircle, label: 'Add Product', color: 'from-pink-600 to-pink-700' },
    { path: '/signup', icon: UserPlus, label: 'Sign Up', color: 'from-green-600 to-green-700' },
    { path: '/signin', icon: LogIn, label: 'Sign In', color: 'from-indigo-600 to-indigo-700' },
  ];

  return (
    <>
      {/* Floating Quick Actions */}
      <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2">
        {/* Action Buttons */}
        <div className={`flex flex-col gap-2 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const isActive = location.pathname === action.path || (action.path === '/' && location.pathname === '/');

            return (
              <Link
                key={action.path}
                to={action.path}
                className={`flex items-center gap-3 bg-white shadow-lg rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${isActive ? 'ring-2 ring-purple-500' : ''
                  }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                  <Icon size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          {isOpen ? <ChevronUp size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 left-4 z-40 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  );
};

export default QuickActions;
