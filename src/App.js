import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Sparkles, ShoppingBag, Star, PlusCircle, UserPlus, LogIn, Home, Package } from 'lucide-react';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Notfound from './components/Notfound';
import Makepayment from './components/Makepayment';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import QuickActions from './components/QuickActions';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 animate-pulse"></div>
          <div className="absolute inset-0 bg-black opacity-20"></div>

          {/* Content */}
          <div className="relative z-10 text-center py-16 px-4">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src='images/gladlogo.png'
                  alt='logoimage'
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-2xl border-4 border-white animate-bounce-slow"
                />
                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-spin" />
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 animate-fade-in">
                <ShoppingBag className="inline-block w-8 h-8 mr-2" />
                Our Products, Your Choice
              </h3>

              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 animate-slide-up">
                Welcome to <span className="text-yellow-400">Glad-Bey</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Purchase Your Price, Discover Your Style
              </p>

              <div className="flex justify-center space-x-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center text-white">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center text-white">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span>Best Prices</span>
                </div>
                <div className="flex items-center text-white">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span>Fast Delivery</span>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <Link
                  to="/"
                  className="btn-gradient text-white px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Home size={18} />
                  <span>Home</span>
                </Link>

                <Link
                  to="/"
                  className="bg-white text-purple-600 px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-purple-50"
                >
                  <Package size={18} />
                  <span>Get Products</span>
                </Link>

                <Link
                  to="/addproducts"
                  className="bg-white text-pink-600 px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-pink-50"
                >
                  <PlusCircle size={18} />
                  <span>Add Products</span>
                </Link>

                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Link>

                <Link
                  to="/signin"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
        </header>

        <Navbar />
        <Routes>

          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/addproducts' element={<Addproducts />} />
          <Route path='/' element={<Getproducts />} />
          <Route path='/makepayment' element={<Makepayment />} />
          <Route path='/footer' element={<Footer />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
        <Footer />
        <Chatbot />
        <QuickActions />
      </div>
    </Router>
  );
}

export default App;
