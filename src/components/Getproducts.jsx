import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Mycarousel from './Mycarousel';
import { ShoppingCart, Star, Heart, Zap, X } from 'lucide-react';

const Getproducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCartPreview, setShowCartPreview] = useState(false);

  const navigate = useNavigate()
  const img_url = "https://saruninimrod.alwaysdata.net/static/images/"

  const addToCart = (product) => {
    const productId = product.product_id || product.id || product.product_name;
    const existingItem = cartItems.find(item => (item.product_id || item.id || item.product_name) === productId);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        (item.product_id || item.id || item.product_name) === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => (item.product_id || item.id || item.product_name) !== productId));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce((sum, item) => sum + (item.product_cost * item.quantity), 0);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://saruninimrod.alwaysdata.net/api/get_products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-4'>
      <Mycarousel />

      {/* Header */}
      <div className="text-center mb-8 px-4">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-3 animate-slide-up">
          Available Products
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Discover our premium collection of fashion essentials
        </p>
      </div>

      {loading && <Loader />}
      {error && (
        <div className="text-center py-12">
          <div className="inline-flex items-center px-6 py-3 bg-red-100 text-red-700 rounded-lg">
            <Zap className="w-5 h-5 mr-2" />
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="container-fluid px-3 md:px-4 lg:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4">
          {products.map((product, index) => (
            <div
              key={product.id || index}
              className='group relative'
              onMouseEnter={() => setHoveredCard(product.id || index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s both` }}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={img_url + product.product_photo}
                    alt={product.product_name}
                    className='w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${hoveredCard === (product.id || index) ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      <button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                        <Heart className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-full shadow-lg">
                      NEW
                    </span>
                  </div>
                </div>

                <div className='p-3 sm:p-4'>
                  <div className="mb-2">
                    <h5 className="text-sm sm:text-base font-bold text-gray-800 mb-1 line-clamp-1">
                      {product.product_name}
                    </h5>
                    <div className="flex items-center mb-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                    {product.product_description.slice(0, 50)}...
                  </p>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base sm:text-lg font-bold text-gradient">
                      KES {product.product_cost}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-3 sm:py-2.5 sm:px-4 rounded-lg flex items-center justify-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Add to Cart</span>
                      <span className="sm:hidden">Cart</span>
                    </button>
                    <button
                      className="flex-1 btn-gradient text-white font-semibold py-2 px-3 sm:py-2.5 sm:px-4 rounded-lg flex items-center justify-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
                      onClick={() => navigate("/makepayment", { state: { product } })}
                    >
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Buy Now</span>
                      <span className="sm:hidden">Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Floating Cart Button ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Cart Preview Panel */}
        {showCartPreview && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 max-h-96 flex flex-col overflow-hidden">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-purple-600 to-pink-600">
              <span className="text-white font-semibold text-sm">Your Cart ({totalItems})</span>
              <button
                onClick={() => setShowCartPreview(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                  <ShoppingCart className="w-10 h-10 mb-2 opacity-30" />
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-50">
                  {cartItems.map((item) => {
                    const itemId = item.product_id || item.id || item.product_name;
                    return (
                      <li key={itemId} className="flex items-center gap-3 px-4 py-3">
                        <img
                          src={img_url + item.product_photo}
                          alt={item.product_name}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-800 truncate">{item.product_name}</p>
                          <p className="text-xs text-gray-500">KES {item.product_cost} × {item.quantity}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(itemId)}
                          className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Panel Footer */}
            {cartItems.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="text-sm font-bold text-gray-800">KES {totalCost.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => navigate("/makepayment", { state: { cartItems } })}
                  className="w-full btn-gradient text-white font-semibold py-2.5 rounded-xl text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() => setShowCartPreview(!showCartPreview)}
          className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-300/50 hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Open cart"
        >
          <ShoppingCart className="w-6 h-6" />
          {/* Badge */}
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </button>
      </div>

      <style jsx>{`
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  )
}

export default Getproducts;