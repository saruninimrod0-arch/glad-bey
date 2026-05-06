import React, { useState } from 'react';
import { ShoppingCart, X, MessageCircle, Send, Bot } from 'lucide-react';

const CartAssistant = ({ cartItems = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: `You currently have ${cartItems.length} item(s) in your cart.`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, aiResponse]);
    }, 800);

    setInputMessage('');
  };

  return (
    <>
      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition"
        >
          <ShoppingCart className="w-6 h-6" />

          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[70] flex justify-center items-center">
          <div className="bg-white w-full max-w-md h-[70vh] rounded-2xl flex flex-col">
            {/* Header */}
            <div className="bg-purple-600 text-white p-4 flex justify-between">
              <span>Cart Assistant</span>
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center">
                  Ask about your cart
                </p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-2 ${
                      msg.sender === 'user'
                        ? 'text-right'
                        : 'text-left'
                    }`}
                  >
                    <div className="inline-block bg-gray-200 p-2 rounded">
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div className="p-4 flex gap-2 border-t">
              <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 border p-2 rounded"
                placeholder="Type..."
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-purple-600 text-white px-3 rounded"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartAssistant;