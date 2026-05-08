import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';

const MainCart = ({ cartItems = [], updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);

  // Memoize calculations to prevent unnecessary re-renders
  const cartTotals = useMemo(() => {
    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    const totalCost = cartItems.reduce((total, item) => total + (item.product_cost * item.quantity), 0);
    return { totalItems, totalCost };
  }, [cartItems]);

  const handleUpdateQuantity = (productId, change) => {
    if (updateQuantity) {
      updateQuantity(productId, change);
    }
  };

  const handleRemoveItem = (productId) => {
    if (removeFromCart) {
      removeFromCart(productId);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      // Navigate to checkout page with cart items
      navigate("/makepayment", {
        state: {
          cartItems: cartItems,
          totalCost: cartTotals.totalCost,
          totalItems: cartTotals.totalItems
        }
      });
      setShowCart(false); // Close cart modal
    }
  };

  return (
    <>
      {/* Main Cart Button - Floating */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setShowCart(!showCart)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-shadow duration-200 relative"
        >
          <ShoppingCart className="w-8 h-8" />
          {cartTotals.totalItems > 0 && (
            <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {cartTotals.totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Cart Preview Panel */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-pink-600">
              <h3 className="text-white font-semibold text-lg">Shopping Cart ({cartTotals.totalItems} items)</h3>
              <button
                onClick={() => setShowCart(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <ShoppingCart className="w-16 h-16 mb-4 opacity-30" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm">Add some products to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const itemId = item.product_id || item.id || item.product_name;
                    return (
                      <div key={itemId} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        {/* Product Image */}
                        <img
                          src={"https://saruninimrod.alwaysdata.net/static/images/" + item.product_photo}
                          alt={item.product_name}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                            {item.product_name}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {item.product_description}
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-bold text-purple-600">
                              KES {item.product_cost}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleUpdateQuantity(itemId, -1)}
                                className="p-1 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-medium text-gray-700 w-8 text-center">
                                {item.quantity || 1}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(itemId, 1)}
                                className="p-1 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Subtotal: KES {item.product_cost * (item.quantity || 1)}
                            </span>
                            <button
                              onClick={() => handleRemoveItem(itemId)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-semibold text-lg">{cartTotals.totalItems}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Total Cost:</span>
                <span className="font-bold text-xl text-purple-600">KES {cartTotals.totalCost}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainCart;
