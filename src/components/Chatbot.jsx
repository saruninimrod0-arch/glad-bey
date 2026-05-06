import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Predefined responses for the chatbot
    const botResponses = {
        greeting: [
            "Hello! Welcome to Glad-Bey! 👋 I'm here to help you with your shopping experience.",
            "Hi there! How can I assist you today?",
            "Welcome! I'm your personal shopping assistant. What can I help you find?"
        ],
        help: [
            "I can help you with: 🛍️ Product information, 💳 Payment questions, 📦 Order status, 🔄 Returns and exchanges",
            "I'm here to assist with product details, shipping information, payment methods, and any shopping questions!"
        ],
        products: [
            "We have a amazing collection of fashion items including clothes, shoes, and accessories! Would you like to see our featured products?",
            "Our catalog includes trendy fashion essentials. Check out our homepage for the latest arrivals!"
        ],
        payment: [
            "We accept M-Pesa, credit cards, and bank transfers. All payments are secure and encrypted! 🔒",
            "Payment options include M-Pesa, Visa, Mastercard, and bank transfers. Your security is our priority!"
        ],
        shipping: [
            "We offer nationwide delivery within 2-3 business days. Express shipping is also available! 📦",
            "Standard delivery takes 2-3 days, express delivery within 24 hours in major cities."
        ],
        returns: [
            "We have a 7-day return policy. Items must be unused with original tags. Contact us for return instructions! 🔄",
            "Returns are accepted within 7 days of delivery. Please keep the original packaging."
        ],
        contact: [
            "You can reach us at: 📞 +254-XXX-XXXX, 📧 support@gladbey.com, or visit our store in Nairobi!",
            "Contact us via phone, email, or visit our physical store. We're here to help!"
        ],
        default: [
            "I'm not sure about that, but I can help with product information, payment methods, shipping, or returns! What would you like to know?",
            "Let me connect you with information about our products, services, or policies. How can I assist?",
            "I'm here to help with your shopping needs. Ask me about products, payment, shipping, or returns!"
        ]
    };

    // Get response based on user input
    const getBotResponse = (userMessage) => {
        const message = userMessage.toLowerCase();

        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
        } else if (message.includes('help') || message.includes('assist')) {
            return botResponses.help[Math.floor(Math.random() * botResponses.help.length)];
        } else if (message.includes('product') || message.includes('item') || message.includes('shop')) {
            return botResponses.products[Math.floor(Math.random() * botResponses.products.length)];
        } else if (message.includes('pay') || message.includes('payment') || message.includes('mpesa') || message.includes('card')) {
            return botResponses.payment[Math.floor(Math.random() * botResponses.payment.length)];
        } else if (message.includes('ship') || message.includes('delivery') || message.includes('delivery')) {
            return botResponses.shipping[Math.floor(Math.random() * botResponses.shipping.length)];
        } else if (message.includes('return') || message.includes('refund') || message.includes('exchange')) {
            return botResponses.returns[Math.floor(Math.random() * botResponses.returns.length)];
        } else if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('address')) {
            return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
        } else {
            return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
        }
    };

    // Auto-scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Send initial greeting when chat opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const greeting = botResponses.greeting[0];
            setMessages([{
                id: Date.now(),
                text: greeting,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }
    }, [isOpen]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && !isMinimized) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen, isMinimized]);

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate bot typing delay
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: getBotResponse(inputMessage),
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setIsMinimized(false);
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Button */}
            {!isOpen && (
                <button
                    onClick={toggleChat}
                    className="relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300">
                        <MessageCircle size={24} />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-96 h-[600px] md:h-[650px]'
                    }`}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Bot size={24} />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h3 className="font-semibold">Glad-Bey Assistant</h3>
                                <p className="text-xs opacity-90">Always here to help</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleMinimize}
                                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                            </button>
                            <button
                                onClick={toggleChat}
                                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    {!isMinimized && (
                        <>
                            <div className="h-[460px] md:h-[510px] overflow-y-auto p-4 bg-gray-50">
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user'
                                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                                                        : 'bg-gray-200'
                                                    }`}>
                                                    {message.sender === 'user' ? (
                                                        <User size={16} className="text-white" />
                                                    ) : (
                                                        <Bot size={16} className="text-gray-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className={`px-4 py-2 rounded-2xl ${message.sender === 'user'
                                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                                            : 'bg-white text-gray-800 border border-gray-200'
                                                        }`}>
                                                        <p className="text-sm">{message.text}</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1 px-1">
                                                        {message.timestamp}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Typing Indicator */}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="flex gap-2 max-w-[80%]">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <Bot size={16} className="text-gray-600" />
                                                </div>
                                                <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl">
                                                    <div className="flex gap-1">
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-white border-t border-gray-200">
                                <div className="flex gap-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your message..."
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={inputMessage.trim() === ''}
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send size={20} />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {['Products', 'Payment', 'Shipping', 'Returns'].map((topic) => (
                                        <button
                                            key={topic}
                                            onClick={() => setInputMessage(topic)}
                                            className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                                        >
                                            {topic}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Chatbot;