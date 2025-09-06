
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  UserIcon,
  ComputerDesktopIcon,
  HomeIcon,
  PhoneIcon,
 
  SparklesIcon
} from '@heroicons/react/24/outline';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! 👋 Welcome to Multi Money Property! I\'m your AI assistant. How can I help you find your dream property today?',
      timestamp: new Date(),
      suggestions: ['Find Properties', 'Connect with Brokers', 'Get Pricing Info', 'Learn About Services']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Predefined responses for common queries
  const predefinedResponses = {
    'hello': 'Hello! How can I assist you with your property needs today?',
    'hi': 'Hi there! Welcome to Multi Money Property. What can I help you with?',
    'properties': 'We have thousands of verified properties across 50+ cities in India! You can browse by location, budget, or property type. Would you like me to help you find something specific?',
    'brokers': 'We have 500+ verified brokers ready to help you! Our brokers are KYC verified and performance-tracked. Would you like me to connect you with a broker in your preferred location?',
    'pricing': 'Our broker packages start from ₹5,000/month with different lead quotas. We offer Starter (50 leads), Growth (150 leads), and Enterprise (300+ leads) plans. Which package interests you?',
    'contact': 'You can reach us at:\n📞 +91 88888 88888\n📧 info@multimoneyproperty.com\n🕒 Available 9AM-6PM, Mon-Sat\n\nWould you like me to connect you with our team directly?',
    'help': 'I can help you with:\n• Finding properties\n• Connecting with brokers\n• Understanding our services\n• Getting pricing information\n• Contact details\n\nWhat would you like to know more about?',
    'thanks': 'You\'re welcome! Is there anything else I can help you with regarding properties or our services?',
    'bye': 'Thank you for using Multi Money Property! Feel free to reach out anytime. Have a great day! 👋'
  };

  // Quick action buttons
  const quickActions = [
    { label: 'Find Properties', icon: HomeIcon, action: 'properties' },
    { label: 'Contact Brokers', icon: UserIcon, action: 'brokers' },
    { label: 'Get Pricing', icon: SparklesIcon, action: 'pricing' },
    { label: 'Contact Us', icon: PhoneIcon, action: 'contact' }
  ];

  // Generate bot response
  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (message.includes(keyword)) {
        return response;
      }
    }

    // Location-based responses
    if (message.includes('mumbai') || message.includes('delhi') || message.includes('bangalore') || 
        message.includes('chennai') || message.includes('hyderabad') || message.includes('pune')) {
      return `Great choice! We have excellent properties in ${message.includes('mumbai') ? 'Mumbai' : 
             message.includes('delhi') ? 'Delhi' : 
             message.includes('bangalore') ? 'Bangalore' : 
             message.includes('chennai') ? 'Chennai' : 
             message.includes('hyderabad') ? 'Hyderabad' : 'Pune'}. Our verified brokers can show you the best options. Would you like me to connect you with a local broker?`;
    }

    // Budget-related responses
    if (message.includes('budget') || message.includes('price') || message.includes('cost')) {
      return 'I\'d be happy to help you find properties within your budget! What\'s your preferred price range? We have options from ₹50L to ₹5Cr+ across different cities.';
    }

    // Default response
    return 'I understand you\'re looking for assistance with real estate. Let me connect you with our expert team who can provide detailed information. You can also call us at +91 88888 88888 for immediate support!';
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: generateBotResponse(inputMessage),
        timestamp: new Date(),
        suggestions: inputMessage.toLowerCase().includes('properties') ? 
          ['Mumbai Properties', 'Delhi Properties', 'Bangalore Properties', 'Budget Properties'] :
          inputMessage.toLowerCase().includes('brokers') ?
          ['Find Local Broker', 'Broker Packages', 'Broker Reviews', 'Contact Broker'] :
          ['Find Properties', 'Connect Brokers', 'Get Pricing', 'Contact Support']
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Handle quick action click
  const handleQuickAction = (action) => {
    const actionMessage = {
      id: Date.now(),
      type: 'user',
      text: `Tell me about ${action}`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, actionMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: predefinedResponses[action] || predefinedResponses['help'],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/*  Responsive Chat Button */}
      <motion.div
        className="fixed bottom-4 sm:bottom-2 right-4 sm:right-6 z-50 cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-orange-500 to-[#154155] hover:from-orange-600 hover:to-[#154155] text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 relative cursor-pointer"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </button>
      </motion.div>

      {/*  Fully Responsive Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`fixed z-50 flex flex-col overflow-hidden border border-gray-200 bg-white shadow-2xl
              /* Mobile: Full screen */
              inset-0 rounded-none
              /* Tablet: Positioned window */
              sm:inset-auto sm:bottom-20 sm:right-4 sm:w-80 sm:h-[500px] sm:rounded-2xl
              /* Desktop: Larger window */
              md:w-96 md:h-[600px] md:bottom-24 md:right-6
            `}
          >
            {/*  Responsive Header */}
            <div className=" bg-[#FF9C00] text-white p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
                  <ComputerDesktopIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm sm:text-base">MMP Assistant</h3>
                  <p className="text-xs opacity-90">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/*  Responsive Quick Actions */}
            <div className="p-2 sm:p-3 bg-gray-50 border-b">
              <div className="grid grid-cols-4 gap-1 sm:gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="flex flex-col items-center p-1.5 sm:p-2 rounded-lg hover:bg-white transition-colors group"
                  >
                    <action.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-orange-500 transition-colors cursor-pointer" />
                    <span className="text-xs text-gray-600 mt-1 text-center leading-tight cursor-pointer">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/*  Responsive Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`p-2.5 sm:p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-[#FF9C00] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="font-body text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.type === 'bot' && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ml-2 mr-2 mt-1 ${
                    message.type === 'user' ? 'order-1 bg-blue-700' : 'order-2 bg-gray-200'
                  }`}>
                    {message.type === 'user' ? (
                      <UserIcon className="w-3 h-3  sm:w-4 sm:h-4 text-white" />
                    ) : (
                      <ComputerDesktopIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/*  Responsive Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-2.5 sm:p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/*  Responsive Input Area */}
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="font-body w-full p-2.5 sm:p-3 pr-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm sm:text-base"
                    rows="1"
                    style={{ minHeight: '40px', maxHeight: '80px' }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-[#0000F5]   disabled:opacity-50 cursor-pointer text-white p-2.5 sm:p-4 rounded-xl transition-all duration-200 transform hover:scale-105 mb-2"
                >
                  <PaperAirplaneIcon className="w-4 h-4  sm:w-5 sm:h-5" />
                </button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                Powered by MMP AI • Always learning to serve you better
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
