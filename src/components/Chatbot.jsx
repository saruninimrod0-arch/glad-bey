import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User, Search, ShoppingCart, Package } from 'lucide-react';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Glad-Bey shopping assistant. I can help you find specific products, check prices, and answer questions about our items. What are you looking for today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef(null);

  // Image URL for products
  const img_url = "https://saruninimrod.alwaysdata.net/static/images/";

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const response = await axios.get("https://saruninimrod.alwaysdata.net/api/get_products", {
        timeout: 10000
      });
      setProducts(response.data);
      setProductsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProductsLoading(false);
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle real-time suggestions as user types
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputMessage(value);

    if (value.length >= 2 && products.length > 0) {
      const matches = getProductSuggestions(value);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion.product_name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Search products based on user query
  const searchProducts = (query) => {
    if (products.length === 0 && !productsLoading) {
      return {
        text: "I'm loading our product catalog. Please give me a moment to fetch the latest items...",
        suggestions: ['Show me all products', 'Check prices', 'Browse categories']
      };
    }

    if (productsLoading) {
      return {
        text: "I'm currently loading our products. Please wait a moment while I fetch the latest inventory...",
        suggestions: ['Show me all products', 'Check prices', 'Browse categories']
      };
    }

    // Use fuzzy search for better partial matching
    const fuzzyMatches = fuzzySearchProducts(query);

    // Check for exact product name matches first
    const exactMatches = fuzzyMatches.filter(product => {
      const productName = (product.product_name || '').toLowerCase();
      const queryLower = query.toLowerCase();
      return productName === queryLower || productName.includes(queryLower);
    });

    // If exact match found, provide availability response
    if (exactMatches.length > 0) {
      const product = exactMatches[0];
      const briefDescription = product.product_description ?
        product.product_description.substring(0, 100) + (product.product_description.length > 100 ? '...' : '') :
        'A quality product from our collection';

      return {
        text: `✅ **Yes, "${product.product_name}" is available!**\n\n📝 **Brief Description:** ${briefDescription}\n\n💰 **Price:** KES ${product.product_cost}\n\nThis item is currently in stock and ready for purchase. Would you like to add it to your cart or buy it now?`,
        product: product,
        suggestions: ['Add to cart', 'Buy now', 'Show similar items', 'See all products']
      };
    }

    if (fuzzyMatches.length === 0) {
      // Try to get suggestions for partial matches
      const suggestions = getProductSuggestions(query.substring(0, Math.max(2, query.length - 1)));
      if (suggestions.length > 0) {
        const suggestionNames = suggestions.slice(0, 3).map(p => `• ${p.product_name}`).join('\n');
        return {
          text: `🔍 **I couldn't find exact matches for "${query}".**\n\n**Did you perhaps mean:**\n\n${suggestionNames}\n\nOr would you like me to show you all available products?`,
          products: suggestions.slice(0, 3),
          suggestions: ['Show details', 'Search again', 'Browse all products', 'Check spelling']
        };
      }

      return {
        text: `❌ **Sorry, "${query}" is not currently available** in our inventory.\n\nThis product might be:\n• Out of stock\n• Not yet added to our catalog\n• Listed under a different name\n• Check your spelling and try again\n\nWould you like me to show you similar products or help you search for something else?`,
        suggestions: ['Show me all products', 'Find similar items', 'Browse categories', 'Contact support']
      };
    }

    if (fuzzyMatches.length === 1) {
      const product = fuzzyMatches[0];
      const briefDescription = product.product_description ?
        product.product_description.substring(0, 100) + (product.product_description.length > 100 ? '...' : '') :
        'A quality product from our collection';

      return {
        text: `✅ **Yes, I found "${product.product_name}" available!**\n\n📝 **Brief Description:** ${briefDescription}\n\n💰 **Price:** KES ${product.product_cost}\n\nThis item is currently in stock and ready for purchase. Would you like to add it to your cart or buy it now?`,
        product: product,
        suggestions: ['Add to cart', 'Buy now', 'Show similar items', 'See all products']
      };
    }

    const productNames = fuzzyMatches.slice(0, 3).map(p => `✅ ${p.product_name} - KES ${p.product_cost}`).join('\n');
    const moreText = fuzzyMatches.length > 3 ? `\n\n✅ ... and ${fuzzyMatches.length - 3} more items available!` : '';

    return {
      text: `✅ **Found ${fuzzyMatches.length} products matching "${query}":**\n\n${productNames}${moreText}\n\nAll these items are currently available. Would you like to see more details about any of these?`,
      products: fuzzyMatches.slice(0, 3),
      suggestions: ['Show me more details', 'Add to cart', 'See all products', 'Search again']
    };
  };

  // Fuzzy search for partial product names
  const fuzzySearchProducts = (partialName) => {
    if (products.length === 0) return [];

    const searchTerms = partialName.toLowerCase().split(' ').filter(term => term.length > 0);

    return products.map(product => {
      const productName = (product.product_name || '').toLowerCase();
      const productDescription = (product.product_description || '').toLowerCase();

      let score = 0;
      let matchedTerms = [];

      // Check each search term
      searchTerms.forEach(term => {
        // Exact match in product name
        if (productName.includes(term)) {
          score += 10;
          matchedTerms.push(term);
        }
        // Product name starts with term
        else if (productName.startsWith(term)) {
          score += 8;
          matchedTerms.push(term);
        }
        // Term contains part of product name
        else if (term.length >= 2 && productName.includes(term)) {
          score += 5;
          matchedTerms.push(term);
        }
        // Product name contains term characters in order
        else if (term.length >= 2) {
          let termIndex = 0;
          let nameIndex = 0;
          let matched = false;

          while (termIndex < term.length && nameIndex < productName.length) {
            if (term[termIndex] === productName[nameIndex]) {
              termIndex++;
            }
            nameIndex++;
          }

          if (termIndex === term.length) {
            score += 3;
            matchedTerms.push(term);
          }
        }
        // Check description
        if (productDescription.includes(term)) {
          score += 2;
        }
      });

      return {
        product,
        score,
        matchedTerms
      };
    })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
  };

  // Get product name suggestions for partial input
  const getProductSuggestions = (partialName) => {
    if (partialName.length < 2) return [];

    const matches = fuzzySearchProducts(partialName);
    return matches.slice(0, 5);
  };

  // Check specific product availability
  const checkProductAvailability = (query) => {
    if (products.length === 0 && !productsLoading) {
      return {
        text: "I'm loading our product catalog to check availability. Please give me a moment...",
        suggestions: ['Show me all products', 'Check prices', 'Browse categories']
      };
    }

    if (productsLoading) {
      return {
        text: "I'm currently loading our products to check availability. Please wait a moment...",
        suggestions: ['Show me all products', 'Check prices', 'Browse categories']
      };
    }

    // Extract product name from the query
    const productName = query.toLowerCase().replace(/is\s+|available\?|available|in\s+stock/g, '').trim();

    // Use fuzzy search to find matches
    const fuzzyMatches = fuzzySearchProducts(productName);

    // Separate exact matches from partial matches
    const exactMatches = fuzzyMatches.filter(product => {
      const name = (product.product_name || '').toLowerCase();
      return name === productName || name.includes(productName);
    });

    // If exact match found, provide availability response
    if (exactMatches.length > 0) {
      const product = exactMatches[0];
      const briefDescription = product.product_description ?
        product.product_description.substring(0, 120) + (product.product_description.length > 120 ? '...' : '') :
        'A quality product from our collection';

      return {
        text: `✅ **YES, "${product.product_name}" is AVAILABLE!**\n\n📝 **Description:** ${briefDescription}\n\n💰 **Price:** KES ${product.product_cost}\n\n✨ **Status:** In stock and ready to ship!\n\nThis item is currently available for immediate purchase. Would you like to add it to your cart or proceed to buy it now?`,
        product: product,
        suggestions: ['Add to cart', 'Buy now', 'Show more details', 'See similar items']
      };
    }

    // If fuzzy matches found but no exact matches
    if (fuzzyMatches.length > 0) {
      const topMatch = fuzzyMatches[0];
      const briefDescription = topMatch.product_description ?
        topMatch.product_description.substring(0, 100) + (topMatch.product_description.length > 100 ? '...' : '') :
        'A quality product from our collection';

      // Check if this might be what the user is looking for
      const isLikelyMatch = (topMatch.product_name || '').toLowerCase().includes(productName) ||
        productName.length >= 3 && (topMatch.product_name || '').toLowerCase().startsWith(productName.substring(0, 3));

      if (isLikelyMatch && fuzzyMatches.length === 1) {
        return {
          text: `🔍 **Did you mean "${topMatch.product_name}"?**\n\n✅ **YES, this product is AVAILABLE!**\n\n📝 **Description:** ${briefDescription}\n\n💰 **Price:** KES ${topMatch.product_cost}\n\n✨ **Status:** In stock and ready to ship!\n\nIs this the item you were looking for?`,
          product: topMatch,
          suggestions: ['Yes, add to cart', 'Yes, buy now', 'No, show other options', 'Search again']
        };
      }

      // Show multiple fuzzy matches
      const matchNames = fuzzyMatches.slice(0, 3).map(p => `✅ ${p.product_name} - KES ${p.product_cost}`).join('\n');
      const moreText = fuzzyMatches.length > 3 ? `\n\n✅ ... and ${fuzzyMatches.length - 3} more items!` : '';

      return {
        text: `🔍 **I couldn't find "${productName}" exactly, but I found these similar products:**\n\n${matchNames}${moreText}\n\nAll these items are currently available. Did you mean any of these?`,
        products: fuzzyMatches.slice(0, 3),
        suggestions: ['Show details', 'Add to cart', 'Search with different name', 'Show all products']
      };
    }

    // No matches found - provide suggestions
    const suggestions = getProductSuggestions(productName.substring(0, Math.max(2, productName.length - 1)));

    if (suggestions.length > 0) {
      const suggestionNames = suggestions.slice(0, 3).map(p => `• ${p.product_name}`).join('\n');
      return {
        text: `❌ **Sorry, "${productName}" is not currently available** in our inventory.\n\n🔍 **Did you perhaps mean:**\n\n${suggestionNames}\n\nOr would you like me to show you all available products?`,
        products: suggestions.slice(0, 3),
        suggestions: ['Show details', 'Search again', 'Browse all products', 'Contact support']
      };
    }

    return {
      text: `❌ **Sorry, "${productName}" is not currently available** in our inventory.\n\nThis product might be:\n• 🔴 Out of stock temporarily\n• 📦 Not yet added to our catalog\n• 🏷️ Listed under a different name\n• ✏️ Check your spelling and try again\n\nWould you like me to:\n• Show you all available products?\n• Help you search with different keywords?`,
      suggestions: ['Show all products', 'Search again', 'Browse categories', 'Check spelling']
    };
  };

  // Search products by price range
  const searchProductsByPrice = (query) => {
    if (products.length === 0 && !productsLoading) {
      return {
        text: "I'm loading our product catalog to check prices. Please give me a moment...",
        suggestions: ['Show me all products', 'Browse categories', 'Check deals']
      };
    }

    if (productsLoading) {
      return {
        text: "I'm currently loading our products and their prices. Please wait a moment...",
        suggestions: ['Show me all products', 'Browse categories', 'Check deals']
      };
    }

    // Extract price range from query
    const priceMatch = query.match(/(\d+)/);
    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[1]);
      const affordableProducts = products.filter(product =>
        parseInt(product.product_cost) <= maxPrice
      );

      if (affordableProducts.length === 0) {
        return {
          text: `I couldn't find any products under KES ${maxPrice}. Here are our most affordable options:`,
          suggestions: ['Show cheapest items', 'Increase budget', 'See all products']
        };
      }

      const productNames = affordableProducts.slice(0, 3).map(p => `• ${p.product_name} - KES ${p.product_cost}`).join('\n');
      const moreText = affordableProducts.length > 3 ? `\n\n... and ${affordableProducts.length - 3} more items under KES ${maxPrice}!` : '';

      return {
        text: `I found ${affordableProducts.length} products under KES ${maxPrice}:\n\n${productNames}${moreText}`,
        products: affordableProducts.slice(0, 3),
        suggestions: ['Show more details', 'Add to cart', 'See all affordable items']
      };
    }

    // Show price ranges if no specific price mentioned
    const prices = products.map(p => parseInt(p.product_cost));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

    return {
      text: `Our products range from KES ${minPrice} to KES ${maxPrice}, with an average price of KES ${avgPrice}.\n\nYou can ask me about specific price ranges like "show me products under 1000" or "what can I get for 500?"`,
      suggestions: [`Under KES ${Math.round(minPrice + (avgPrice - minPrice) / 2)}`, `Under KES ${avgPrice}`, `Under KES ${Math.round(avgPrice + (maxPrice - avgPrice) / 2)}`, 'Show all products']
    };
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Direct availability questions
    if (message.includes('is') && (message.includes('available') || message.includes('in stock'))) {
      return checkProductAvailability(userMessage);
    }

    // Product search functionality
    if (message.includes('looking for') || message.includes('search') || message.includes('find') || message.includes('show me') || message.includes('want')) {
      return searchProducts(userMessage);
    }

    // Specific product inquiries
    if (message.includes('do you have') || message.includes('any') || message.includes('available')) {
      return checkProductAvailability(userMessage);
    }

    // Price inquiries
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return searchProductsByPrice(userMessage);
    }

    // Product category inquiries
    if (message.includes('product') || message.includes('item') || message.includes('buy')) {
      return {
        text: "I can help you find specific products! Just tell me what you're looking for, like 'show me shirts' or 'do you have shoes?'",
        suggestions: ['Show me all products', "What's on sale?", 'Find electronics', 'Browse clothing']
      };
    }

    // Payment-related responses
    if (message.includes('payment') || message.includes('pay') || message.includes('checkout')) {
      return {
        text: "We accept various payment methods including credit cards, debit cards, and mobile money. You can proceed to payment after adding items to your cart.",
        suggestions: ['How to add to cart?', 'Payment methods', 'Checkout process']
      };
    }

    // Account-related responses
    if (message.includes('account') || message.includes('signup') || message.includes('signin') || message.includes('login')) {
      return {
        text: "You can create an account by clicking 'Sign Up' or access your existing account with 'Sign In'. Having an account helps you track orders and save preferences.",
        suggestions: ['Sign Up', 'Sign In', 'Forgot password?']
      };
    }

    // Shipping-related responses
    if (message.includes('shipping') || message.includes('delivery') || message.includes('ship')) {
      return {
        text: "We offer fast and reliable shipping! Standard delivery takes 3-5 business days, while express delivery takes 1-2 business days. Shipping costs vary based on your location.",
        suggestions: ['Shipping costs', 'Track order', 'Delivery areas']
      };
    }

    // Return-related responses
    if (message.includes('return') || message.includes('refund') || message.includes('exchange')) {
      return {
        text: "We have a 30-day return policy. Items must be in original condition with tags attached. Contact our support team to initiate a return.",
        suggestions: ['Return policy', 'Contact support', 'Exchange policy']
      };
    }

    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return {
        text: "Hello! Welcome to Glad-Bey! I'm here to help you with shopping, product information, payments, and any questions you might have.",
        suggestions: ['Browse products', 'Payment info', 'Shipping details']
      };
    }

    // Help responses
    if (message.includes('help') || message.includes('assist')) {
      return {
        text: "I can help you with:\n• Finding products\n• Payment and checkout\n• Account management\n• Shipping information\n• Returns and refunds\n• General questions\n\nWhat would you like help with?",
        suggestions: ['Find products', 'Payment help', 'Account help', 'Shipping info']
      };
    }

    // Default response
    return {
      text: "I'm here to help! You can ask me about products, payments, shipping, returns, or any other questions about shopping at Glad-Bey.",
      suggestions: ['Browse products', 'Payment methods', 'Shipping info', 'Contact support']
    };
  };

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };


  // Handle product-specific actions
  const handleProductAction = (action, product) => {
    if (action === 'add_to_cart') {
      // Add to cart functionality
      const newMessage = {
        id: messages.length + 1,
        text: `I'd like to add "${product.product_name}" to my cart.`,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);

      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: `Great! I've added "${product.product_name}" to your cart. You can continue shopping or proceed to checkout when you're ready.`,
          sender: 'bot',
          timestamp: new Date(),
          suggestions: ['Continue shopping', 'View cart', 'Checkout', 'Find more items']
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    } else if (action === 'buy_now') {
      const newMessage = {
        id: messages.length + 1,
        text: `I want to buy "${product.product_name}" now.`,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);

      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: `Perfect! I'll redirect you to the checkout page for "${product.product_name}". You'll be able to complete your purchase there.`,
          sender: 'bot',
          timestamp: new Date(),
          suggestions: ['Continue shopping', 'Find similar items', 'Browse categories']
        };
        setMessages(prev => [...prev, botMessage]);
        // Redirect to payment page after a short delay
        setTimeout(() => {
          window.open('/makepayment', '_blank');
        }, 2000);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        >
          <MessageCircle className="w-8 h-8 group-hover:animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></span>
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isMinimized ? 'w-80' : 'w-96'} bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">Glad-Bey Assistant</h3>
            <p className="text-xs opacity-90">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${message.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === 'bot' && <Bot className="w-4 h-4 mt-0.5 text-purple-600" />}
                    {message.sender === 'user' && <User className="w-4 h-4 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.text}</p>

                      {/* Display single product card */}
                      {message.product && (
                        <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                          <div className="flex gap-3">
                            <img
                              src={img_url + message.product.product_photo}
                              alt={message.product.product_name}
                              className="w-16 h-16 object-cover rounded-lg shadow-sm"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm text-gray-800">{message.product.product_name}</h4>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{message.product.product_description}</p>
                              <p className="text-sm font-bold text-purple-600 mt-2">KES {message.product.product_cost}</p>
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => handleProductAction('add_to_cart', message.product)}
                                  className="flex-1 bg-green-500 text-white text-xs py-1 px-2 rounded hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                                >
                                  <ShoppingCart className="w-3 h-3" />
                                  Add to Cart
                                </button>
                                <button
                                  onClick={() => handleProductAction('buy_now', message.product)}
                                  className="flex-1 bg-purple-600 text-white text-xs py-1 px-2 rounded hover:bg-purple-700 transition-colors"
                                >
                                  Buy Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Display multiple product cards */}
                      {message.products && message.products.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.products.map((product, index) => (
                            <div key={index} className="p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                              <div className="flex gap-2">
                                <img
                                  src={img_url + product.product_photo}
                                  alt={product.product_name}
                                  className="w-12 h-12 object-cover rounded shadow-sm"
                                />
                                <div className="flex-1">
                                  <h5 className="font-semibold text-xs text-gray-800">{product.product_name}</h5>
                                  <p className="text-xs font-bold text-purple-600">KES {product.product_cost}</p>
                                  <div className="flex gap-1 mt-1">
                                    <button
                                      onClick={() => handleProductAction('add_to_cart', product)}
                                      className="flex-1 bg-green-500 text-white text-xs py-0.5 px-1 rounded hover:bg-green-600 transition-colors text-xs"
                                    >
                                      <ShoppingCart className="w-2 h-2 inline mr-1" />
                                      Add
                                    </button>
                                    <button
                                      onClick={() => handleProductAction('buy_now', product)}
                                      className="flex-1 bg-purple-600 text-white text-xs py-0.5 px-1 rounded hover:bg-purple-700 transition-colors text-xs"
                                    >
                                      Buy
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Suggestions */}
            {messages[messages.length - 1]?.sender === 'bot' && messages[messages.length - 1]?.suggestions && (
              <div className="flex flex-wrap gap-2 mt-2">
                {messages[messages.length - 1].suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-purple-600" />
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

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            {/* Real-time Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="mb-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-xs text-purple-700 font-semibold mb-2">💡 Product suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.slice(0, 4).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs bg-white text-purple-700 px-3 py-1 rounded-full border border-purple-300 hover:bg-purple-100 transition-colors flex items-center gap-1"
                    >
                      <Package className="w-3 h-3" />
                      {suggestion.product_name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (e.g., 'shoes' or 'red dress')"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
