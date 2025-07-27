"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [messages, setMessages] = useState(() => {
    // Try to load messages from sessionStorage
    if (typeof window !== 'undefined') {
      const savedMessages = sessionStorage.getItem('chatMessages');
      if (savedMessages) {
        return JSON.parse(savedMessages);
      }
    }
    return [
      { id: 1, text: "Hi there! 👋 Welcome to MultiMantra - One Mantra, Many Solutions. How can I help you today?", isBot: true },
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [analytics, setAnalytics] = useState(() => {
    // Try to load analytics from sessionStorage
    if (typeof window !== 'undefined') {
      const savedAnalytics = sessionStorage.getItem('chatAnalytics');
      if (savedAnalytics) {
        return JSON.parse(savedAnalytics);
      }
    }
    return {};
  });
  const messagesEndRef = useRef(null);
  
  // Listen for Ctrl+Shift+A to toggle admin panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdmin(!showAdmin);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAdmin]);

  // Auto-scroll to bottom when new messages appear and save to session storage
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Save messages to session storage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Simple rule-based response system
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Track this question for analytics
    trackQuestion(inputValue);
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    
    // Check if we should give a page-specific response
    const pageSpecificResponse = getPageSpecificResponse(inputValue.toLowerCase(), window.location.pathname);
    
    // Simulate typing delay for bot
    setTimeout(() => {
      const botResponse = pageSpecificResponse || generateResponse(inputValue.toLowerCase());
      const newBotMessage = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    }, 600);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Track analytics for questions
  const trackQuestion = (query) => {
    // Use rule-based approach to categorize the query
    const topic = identifyTopic(query);
    
    setAnalytics(prev => {
      return {
        ...prev,
        [topic]: (prev[topic] || 0) + 1
      };
    });
    
    // Save analytics to session storage
    if (typeof window !== 'undefined') {
      const savedAnalytics = sessionStorage.getItem('chatAnalytics');
      const prevAnalytics = savedAnalytics ? JSON.parse(savedAnalytics) : {};
      const newAnalytics = {
        ...prevAnalytics,
        [topic]: (prevAnalytics[topic] || 0) + 1
      };
      sessionStorage.setItem('chatAnalytics', JSON.stringify(newAnalytics));
    }
  };
  
  // Identify the topic of a question
  const identifyTopic = (query) => {
    query = query.toLowerCase();
    if (query.includes('payment') || query.includes('pay') || query.includes('donation')) {
      return 'payment';
    } else if (query.includes('link') || query.includes('shorten') || query.includes('mantrashort')) {
      return 'links';
    } else if (query.includes('blog') || query.includes('article') || query.includes('writemantra')) {
      return 'blog';
    } else if (query.includes('multilinks') || query.includes('linktree')) {
      return 'multilinks';
    } else if (query.includes('feature') || query.includes('service') || query.includes('what')) {
      return 'features';
    } else if (query.includes('tech') || query.includes('stack')) {
      return 'tech';
    } else if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return 'greeting';
    } else {
      return 'other';
    }
  };

  // Get page-specific responses based on current URL
  const getPageSpecificResponse = (input, pathname) => {
    // For the blog page
    if (pathname.includes('/blog')) {
      if (input.includes('post') || input.includes('article') || input.includes('write')) {
        return "You're currently on our blog page. Here you can read articles or create your own blog post. Would you like to start writing?";
      }
    }
    
    // For the payment page
    if (pathname.includes('/dashboard')) {
      if (input.includes('payment') || input.includes('donate') || input.includes('money')) {
        return "You're on the dashboard page. You can manage your profile and make payments here. Need help with a specific feature?";
      }
    }
    
    // For the link shortening page
    if (pathname.includes('/link') || pathname.includes('/shorten')) {
      if (input.includes('link') || input.includes('url') || input.includes('shorten')) {
        return "You're on our URL shortening page. Just paste your long URL in the input field, and we'll create a short, memorable link for you!";
      }
    }
    
    return null; // Return null if no page-specific response is found
  };

  // Generate responses based on user input
  const generateResponse = (input) => {
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return 'Hello! Welcome to MultiMantra! How can I help you today?';
    } else if (input.includes('payment') || input.includes('pay') || input.includes('donation')) {
      return 'MultiMantra offers secure payment processing via Razorpay. Visit our donation page to support us! We accept all major credit cards, debit cards, and UPI payments.';
    } else if (input.includes('link') || input.includes('shorten') || input.includes('mantrashort')) {
      return 'MantraShort allows you to create shortened URLs quickly and easily. Try our URL shortening service in the shorten section! You can customize your links and track click statistics too.';
    } else if (input.includes('blog') || input.includes('article') || input.includes('writemantra')) {
      return 'With WriteMantra, you can write, edit, and publish your own blogs. Check out our blog section to start writing or reading! Our rich text editor makes writing engaging content simple.';
    } else if (input.includes('multilinks') || input.includes('linktree')) {
      return 'MultiLinks allows you to create your own linktree-style page to share all your links in one place. Perfect for social media profiles, portfolios, or personal branding!';
    } else if (input.includes('contact') || input.includes('support')) {
      return 'Need help? Visit our contact page or email us at support@multimantra.com. Our support team is available Monday through Friday, 9 AM to 6 PM.';
    } else if (input.includes('feature') || input.includes('service') || input.includes('what')) {
      return 'MultiMantra offers MantraShort (URL shortening), Donation services, MultiLinks (linktree-style pages), and WriteMantra (blogging platform). Visit our features page to learn more about all our services!';
    } else if (input.includes('account') || input.includes('register') || input.includes('login') || input.includes('sign')) {
      return 'You can create a free account to access all our services. Just click the "Login" button in the top-right corner and follow the registration process. Already have an account? Simply log in to access your dashboard.';
    } else if (input.includes('privacy') || input.includes('data') || input.includes('secure')) {
      return 'We take your privacy seriously. All data is encrypted and we never share your personal information with third parties. Check out our Privacy Policy for more details.';
    } else if (input.includes('free') || input.includes('cost') || input.includes('pricing') || input.includes('plan')) {
      return 'MultiMantra offers both free and premium plans. The free plan includes basic features of all our services. Premium plans start at $9.99/month with additional features like analytics, custom domains, and priority support.';
    } else if (input.includes('thank')) {
      return "You're welcome! If you need anything else, just ask.";
    } else if (input.includes('bye') || input.includes('goodbye')) {
      return 'Goodbye! Have a great day!';
    } else if (input.includes('tech') || input.includes('stack') || input.includes('built')) {
      return 'MultiMantra is built with Next.js, Express.js, Node.js, MongoDB, and Tailwind CSS. We also use Razorpay for payment processing and various other technologies to ensure a smooth user experience.';
    } else if (input.includes('mobile') || input.includes('app') || input.includes('android') || input.includes('ios')) {
      return 'MultiMantra is fully responsive and works great on mobile browsers. We are also working on dedicated mobile apps for Android and iOS that will be released soon!';
    } else if (input.includes('api') || input.includes('integrate')) {
      return 'Yes, we offer API access for developers to integrate our services into their own applications. Check out our API documentation in the footer section for more details.';
    } else if (input.includes('how') && input.includes('use')) {
      return 'To use MultiMantra services, simply create an account, then navigate to the specific service you need. Each service has a simple interface with clear instructions to get started. Need help with a specific service?';
    } else if (input.includes('reset') || input.includes('forgot') && input.includes('password')) {
      return 'Forgot your password? Click the "Forgot Password" link on the login page. We\'ll send you an email with instructions to reset your password.';
    } else if (input.includes('delete') || input.includes('remove') && input.includes('account')) {
      return 'To delete your account, go to your profile settings in the dashboard and scroll to the bottom. You\'ll find the option to delete your account there. Please note that this action cannot be undone.';
    } else {
      return "I'm not sure I understand. You can ask me about our features like MantraShort, MultiLinks, WriteMantra, pricing plans, or technical support. How can I assist you today?";
    }
  };

  // Format analytics data for display with animations
  const formatAnalytics = () => {
    return Object.entries(analytics).map(([topic, count], index) => (
      <motion.div 
        key={topic} 
        className="flex justify-between border-b pb-2 mb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          delay: index * 0.05,
          type: "spring", 
          stiffness: 300, 
          damping: 24
        }}
        whileHover={{ 
          backgroundColor: "rgba(139, 92, 246, 0.1)",
          scale: 1.02,
          padding: "2px 4px",
          borderRadius: "4px" 
        }}
      >
        <motion.span 
          className="font-medium capitalize"
          whileHover={{ color: "#8B5CF6" }}
        >
          {topic}:
        </motion.span>
        <motion.span 
          className="font-bold"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {count}
        </motion.span>
      </motion.div>
    ));
  };

  return (
    <>
      {/* Admin Analytics Panel with enhanced animations */}
      <AnimatePresence>
        {showAdmin && (
          <motion.div 
            className="fixed top-20 right-4 w-80 bg-white rounded-lg shadow-xl p-4 z-50 border border-purple-300"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              boxShadow: "0px 8px 20px rgba(139, 92, 246, 0.25)" 
            }}
            exit={{ 
              opacity: 0, 
              x: 50, 
              scale: 0.9 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
          >
            <motion.div 
              className="flex justify-between items-center mb-4 border-b pb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h3 
                className="font-bold text-purple-800"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                ChatBot Analytics
              </motion.h3>
              <motion.button
                onClick={() => setShowAdmin(false)}
                className="text-gray-600 hover:text-gray-800 rounded-full p-1"
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>

          
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h4 
              className="font-medium text-gray-700 mb-2"
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              Questions by Topic
            </motion.h4>
            {Object.keys(analytics).length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, staggerChildren: 0.1 }}
              >
                {formatAnalytics()}
              </motion.div>
            ) : (
              <motion.p 
                className="text-gray-500 text-sm"
                animate={{ 
                  opacity: [0.5, 1, 0.5], 
                  scale: [0.98, 1, 0.98] 
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2, 
                  ease: "easeInOut" 
                }}
              >
                No data available yet.
              </motion.p>
            )}
          </motion.div>
          <motion.div 
            className="flex justify-between border-t pt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="font-medium">Total Messages:</span>
            <motion.span 
              className="font-bold"
              key={messages.length} // Force re-animation when count changes
              initial={{ scale: 1.5, color: "#8B5CF6" }}
              animate={{ scale: 1, color: "#1F2937" }}
              transition={{ duration: 0.3 }}
            >
              {messages.length}
            </motion.span>
          </motion.div>
          <motion.button 
            onClick={() => {
              sessionStorage.removeItem('chatAnalytics');
              setAnalytics({});
            }}
            className="mt-4 w-full py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm shadow-md"
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0px 4px 10px rgba(239, 68, 68, 0.4)" 
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Clear Analytics Data
          </motion.button>
          <motion.p 
            className="text-xs text-gray-500 mt-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Press Ctrl+Shift+A to toggle this panel
          </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat button with enhanced animations */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ 
          scale: 1.1, 
          boxShadow: "0px 0px 8px rgba(139, 92, 246, 0.8)",
          transition: { duration: 0.3 }
        }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-purple-800 hover:bg-purple-900 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
          aria-label="Open chat"
          whileTap={{ scale: 0.9 }}
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </motion.svg>
          )}
        </motion.button>
      </motion.div>

      {/* Chat window with enhanced animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden z-40 border border-gray-200"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)"
            }}
            exit={{ 
              opacity: 0, 
              y: 50, 
              scale: 0.9,
              transition: { duration: 0.3 }
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            whileHover={{
              boxShadow: "0px 12px 30px rgba(139, 92, 246, 0.2)"
            }}
          >
            {/* Chat header with enhanced animations */}
            <motion.div 
              className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-4 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="flex items-center"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center mr-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 360] }}
                  transition={{ 
                    scale: { duration: 0.5 },
                    rotate: { duration: 0.8, ease: "easeOut" }
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </motion.svg>
                </motion.div>
                <motion.h3 
                  className="font-medium"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  MultiMantra Assistant
                </motion.h3>
              </motion.div>
              <motion.div 
                className="flex items-center"
                initial={{ x: 20 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.button
                  onClick={() => {
                    setMessages([
                      { id: 1, text: "Hi there! 👋 Welcome to MultiMantra - One Mantra, Many Solutions. How can I help you today?", isBot: true },
                    ]);
                    sessionStorage.removeItem('chatMessages');
                  }}
                  className="text-white hover:bg-purple-700 rounded-full p-1 cursor-pointer mr-2"
                  title="Clear chat history"
                  whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </motion.button>
                <motion.button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-purple-700 rounded-full p-1 cursor-pointer"
                  whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Chat messages with enhanced animations */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-50 border-b border-gray-200 relative">
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-50 to-transparent pointer-events-none opacity-50"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                    delay: index * 0.1 % 0.5 // Staggered animation but capped at 0.5s max delay
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className={`rounded-lg py-3 px-4 max-w-[80%] shadow-md ${
                      message.isBot
                        ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
                        : 'bg-gradient-to-r from-purple-700 to-purple-900 text-white'
                    }`}
                    whileHover={{
                      boxShadow: message.isBot 
                        ? "0px 4px 12px rgba(0, 0, 0, 0.1)"
                        : "0px 4px 12px rgba(139, 92, 246, 0.3)"
                    }}
                    layout
                  >
                    <motion.p 
                      className="text-sm md:text-base"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {message.text}
                    </motion.p>
                  </motion.div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input with enhanced animations */}
            <motion.div 
              className="p-4 border-t border-gray-200 bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex">
                <motion.input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-grow px-4 py-3 border-2 border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800"
                  whileFocus={{ boxShadow: "0px 0px 8px rgba(139, 92, 246, 0.3)" }}
                  animate={{ 
                    boxShadow: inputValue ? "0px 2px 8px rgba(0, 0, 0, 0.1)" : "none"
                  }}
                />
                <motion.button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-4 py-2 rounded-r-lg cursor-pointer transition-colors"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#6b21a8" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  disabled={inputValue.trim() === ''}
                  animate={{
                    opacity: inputValue.trim() === '' ? 0.7 : 1
                  }}
                >
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ 
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </motion.svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
