import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, Package, Shield, Truck, Users, Award, Clock, Phone, Mail, MapPin } from 'lucide-react';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Glad-Bey
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your trusted destination for premium fashion essentials. We're passionate about bringing you the latest trends with unmatched quality and service.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">About Glad-Bey</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Founded with a vision to revolutionize fashion retail, Glad-Bey has become a leading name in premium fashion essentials.
                We carefully curate our collection to ensure every piece meets our high standards of quality, style, and affordability.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our mission is simple: to make fashion accessible to everyone while maintaining the highest standards of customer service and satisfaction.
              </p>
            </div>
            <div>
              <p className="text-gray-300 leading-relaxed mb-4">
                With years of experience in the fashion industry, we understand what our customers want - trendy, comfortable, and affordable clothing that makes them feel confident.
              </p>
              <p className="text-gray-300 leading-relaxed">
                From casual wear to special occasions, Glad-Bey has something for every style and preference.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Choose Glad-Bey?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-purple-600 rounded-full">
                <Package className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Premium Quality</h3>
            <p className="text-gray-300 text-center">
              Every product is carefully selected and quality-tested to ensure you receive only the best fashion items.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-pink-600 rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Secure Shopping</h3>
            <p className="text-gray-300 text-center">
              Your security is our priority. We use industry-standard encryption and secure payment methods for your peace of mind.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-green-600 rounded-full">
                <Truck className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Fast Delivery</h3>
            <p className="text-gray-300 text-center">
              We deliver countrywide with quick turnaround times. Your orders reach you in perfect condition and on time.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-blue-600 rounded-full">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Customer Support</h3>
            <p className="text-gray-300 text-center">
              Our dedicated support team is always ready to help you with any questions or concerns you may have.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-yellow-600 rounded-full">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">Best Prices</h3>
            <p className="text-gray-300 text-center">
              We offer competitive prices without compromising on quality. Fashion should be affordable for everyone.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-red-600 rounded-full">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 text-center">24/7 Service</h3>
            <p className="text-gray-300 text-center">
              Shop anytime, anywhere. Our online store is always open, and our chatbot is here to assist you 24/7.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">5000+</div>
              <div className="text-purple-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-purple-100">Products Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-purple-100">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-purple-100">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-purple-600 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
              <button
                onClick={() => window.location.href = 'tel:0785816800'}
                className="text-gray-300 hover:text-white transition-colors underline hover:no-underline cursor-pointer font-medium"
              >
                0785816800
              </button>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-pink-600 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
              <span className="text-white">Naila.lglado@gmail.com</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-green-600 rounded-full">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
              <p className="text-gray-300">Nairobi, Kenya</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto text-center">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Shop also?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover our amazing collection of fashion essentials and experience the Glad-Bey difference today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Shop Now
            </button>
            <button
              onClick={() => window.location.href = 'tel:0785816800'}
              className="px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-600"
            >
              📞 Call Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
