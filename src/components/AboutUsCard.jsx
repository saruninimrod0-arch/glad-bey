import React from 'react';
import { Heart, Star, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUsCard = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 items-start text-left">
            {/* Left Side - About Content */}
            <div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-xl mr-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">About Glad-Bey</h2>
              </div>

              <p className="text-gray-300 leading-relaxed mb-4">
                Welcome to Glad-Bey, your trusted destination for premium fashion essentials.
                We're passionate about bringing you the latest trends with unmatched quality and service.
              </p>

              <p className="text-gray-300 leading-relaxed mb-6">
                Founded with a vision to revolutionize fashion retail, we carefully curate our collection
                to ensure every piece meets our high standards of quality, style, and affordability.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <div className="flex items-center text-purple-300">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm">Premium Quality</span>
                </div>
                <div className="flex items-center text-purple-300">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm">Best Prices</span>
                </div>
                <div className="flex items-center text-purple-300">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm">Fast Delivery</span>
                </div>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Learn More About Us
              </Link>
            </div>

            {/* Right Side - Contact Info */}
            <div className="bg-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Get In Touch</h3>

              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-800 rounded-lg">
                  <div className="p-2 bg-purple-600 rounded-full mr-3">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Call Us</div>
                    <button
                      onClick={() => window.location.href = 'tel:0785816800'}
                      className="text-white hover:text-purple-300 transition-colors font-medium"
                    >
                      0785816800
                    </button>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-800 rounded-lg">
                  <div className="p-2 bg-pink-600 rounded-full mr-3">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Email Us</div>
                    <div className="text-white">Naila.lglado@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-800 rounded-lg">
                  <div className="p-2 bg-green-600 rounded-full mr-3">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Visit Us</div>
                    <div className="text-white">Nairobi, Kenya</div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-600">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">5000+</div>
                  <div className="text-xs text-gray-400">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">1000+</div>
                  <div className="text-xs text-gray-400">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">98%</div>
                  <div className="text-xs text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsCard;
