import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Mycarousel from './Mycarousel';
import CartAssistant from './CartAssistant';
import { ShoppingCart, Star, Heart, Zap } from 'lucide-react';

const Getproducts = () => {

  // Initialize hooks to help you manage the state of your application
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Declare the navigate hook
  const navigate = useNavigate()

  // Below we specify the image url
  const img_url = "https://saruninimrod.alwaysdata.net/static/images/"

  // Add to cart function
  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    console.log('Current cart items:', cartItems);
    const productId = product.product_id || product.id || product.product_name;
    const existingItem = cartItems.find(item => (item.product_id || item.id || item.product_name) === productId);
    if (existingItem) {
      const updatedCart = cartItems.map(item =>
        (item.product_id || item.id || item.product_name) === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      const newCart = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(newCart);
    }
    console.log('Updated cart:', cartItems);
  };

  // Create a function to help fetch the products from your API
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

  // Use the useEffect hook to automatically fetch products on component mount
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-4'>
      <Mycarousel />
      <CartAssistant cartItems={cartItems} />

      {/* Enhanced Header */}
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

      {/* Enhanced Product Grid - Optimized to fill page */}
      <div className="container-fluid px-3 md:px-4 lg:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4">
          {products.map((product, index) => (
            <div
              key={product.id || index}
              className='group relative'
              onMouseEnter={() => setHoveredCard(product.id || index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Card */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={img_url + product.product_photo}
                    alt={product.product_name}
                    className='w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110'
                  />

                  {/* Overlay Actions */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${hoveredCard === (product.id || index) ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      <button className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                        <Heart className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-full shadow-lg">
                      NEW
                    </span>
                  </div>
                </div>

                {/* Product Info */}
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
                    <div>
                      <span className="text-base sm:text-lg font-bold text-gradient">
                        KES {product.product_cost}
                      </span>
                    </div>
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

      {/* Add custom styles for line-clamp */}
      <style jsx>{`
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  )
}

export default Getproducts;
