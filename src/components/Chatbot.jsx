import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  Send,
  X,
  Bot,
  Minimize2,
  Maximize2,
} from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: inputMessage, sender: 'user' },
    ]);

    setInputMessage('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: 'How can I help you?',
          sender: 'bot',
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
      {/* Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl"
        >
          <MessageCircle />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto bg-white w-96 h-[550px] rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 text-white p-4 flex justify-between">
            <span>Assistant</span>
            <div className="flex gap-2">
              <button onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? <Maximize2 /> : <Minimize2 />}
              </button>
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="h-[430px] overflow-y-auto p-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="mb-2">
                    <div className="bg-gray-200 p-2 rounded inline-block">
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 flex gap-2 border-t">
                <input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 border p-2 rounded"
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="bg-purple-600 text-white px-3 rounded"
                >
                  <Send size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;