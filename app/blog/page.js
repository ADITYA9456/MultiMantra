"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Toast Component
function Toast({ message, type = "success", isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className={`
        px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border
        ${type === "success" 
          ? "bg-green-500/20 border-green-500/50 text-green-100" 
          : "bg-red-500/20 border-red-500/50 text-red-100"
        }
      `}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">
            {type === "success" ? "🎉" : "❌"}
          </span>
          <span className="font-medium">{message}</span>
        </div>
      </div>
    </motion.div>
  );
}

function Button({ children, onClick, className = "" }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${className} hover:opacity-90`}
    >
      {children}
    </motion.button>
  );
}

function Input({ value, onChange, placeholder, className = "" }) {
  return (
    <motion.input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      whileFocus={{ scale: 1.02 }}
      className={`w-full p-4 rounded-xl border-2 border-gray-700 bg-gray-800/50 backdrop-blur-md text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300 ${className}`}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 5, className = "" }) {
  return (
    <motion.textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      whileFocus={{ scale: 1.01 }}
      className={`w-full p-4 rounded-xl border-2 border-gray-700 bg-gray-800/50 backdrop-blur-md text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300 resize-none ${className}`}
    />
  );
}

export default function BlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageList, setImageList] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success", isVisible: false });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setImageList((prev) => [...prev, imageUrl.trim()]);
      setImageUrl("");
      showToast("Image added successfully! 📸", "success");
    }
  };

  const handleRemoveImage = (index) => {
    setImageList((prev) => prev.filter((_, i) => i !== index));
    showToast("Image removed successfully! 🗑️", "success");
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      showToast("Please fill in both title and content! 📝", "error");
      return;
    }

    const slug = title.toLowerCase().replace(/\s+/g, "-").slice(0, 30);

    try {
      showToast("Publishing your blog... ⏳", "success");
      
      // 1. Save blog to MongoDB
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, images: imageList }),
      });

      if (!res.ok) throw new Error("Failed to save blog in DB");

      showToast("Blog published successfully! 🎉", "success");

      // 2. Redirect to slug page with query
      setTimeout(() => {
        const query = new URLSearchParams({
          title,
          content,
          images: JSON.stringify(imageList),
        }).toString();

        router.push(`/aaa/${slug}?${query}`);
      }, 1500);

    } catch (err) {
      console.error("Error publishing blog:", err);
      showToast("Failed to publish blog! Please try again. 😞", "error");
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient mesh */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(168,85,247,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 80% 70%, rgba(236,72,153,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 40% 80%, rgba(59,130,246,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 20% 30%, rgba(168,85,247,0.15) 0%, transparent 70%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0"
        />
        
        {/* Floating writing elements */}
        {isClient && Array.from({ length: 12 }).map((_, i) => {
          const icons = ['✍️', '📝', '📖', '💡', '🎨', '✨', '📚', '🖋️', '📄', '💭', '🌟', '🎯'];
          const icon = icons[i % icons.length];
          const size = Math.random() * 20 + 15;
          
          return (
            <motion.div
              key={`writing-icon-${i}`}
              className="absolute opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${size}px`
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 50 - 25, 0],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 10 + 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            >
              {icon}
            </motion.div>
          );
        })}
        
        {/* Floating orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.3],
            x: [0, -80, 0],
            y: [0, 60, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Enhanced Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="pt-32 pb-12 text-center relative z-10"
      >
        <motion.h1
          className="text-6xl md:text-7xl font-bold px-10 mb-6 text-white"
        >
          Write your blog with{" "}
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              backgroundPosition: { duration: 3, repeat: Infinity }
            }}
          >
            MULTIMANTRA !
          </motion.span>
        </motion.h1>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="w-32 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-500 mx-auto rounded-full"
        />
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-gray-300 text-xl mt-4 max-w-2xl mx-auto"
        >
          ✨ Transform your thoughts into beautiful stories with our enhanced blog editor ✨
        </motion.p>
      </motion.div>

      {/* Enhanced Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 min-h-screen text-white relative z-10">
        {/* Enhanced Write Form */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-700/50 relative overflow-hidden"
        >
          <div className="relative z-10">
            <motion.h2
              className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              ✍️ Write a Blog
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Blog Title</label>
                <Input
                  placeholder="Enter your amazing blog title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Add Images</label>
                <div className="flex gap-3">
                  <Input
                    placeholder="Paste image URL here..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 whitespace-nowrap"
                    onClick={handleAddImage}
                  >
                    Add Image 📸
                  </Button>
                </div>
                
                {/* Image List */}
                {imageList.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 space-y-2"
                  >
                    {imageList.map((url, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg"
                      >
                        <img
                          src={url}
                          alt={`Preview ${idx + 1}`}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <span className="text-sm text-gray-300 flex-1 truncate">{url}</span>
                        <button
                          onClick={() => handleRemoveImage(idx)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                <Textarea
                  placeholder="Start writing your amazing blog here... Share your thoughts, experiences, and insights with the world! ✨"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                />
              </div>

              <Button
                onClick={handlePublish}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 text-lg"
              >
                🚀 Publish Your Masterpiece
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Preview */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-700/50 relative overflow-hidden"
        >
          <div className="relative z-10">
            <motion.h2
              className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
            >
              👁️ Live Preview
            </motion.h2>

            <div className="h-[70vh] overflow-y-auto">
              <motion.div
                className="bg-gray-800/30 p-6 rounded-2xl border border-gray-700/30"
              >
                <motion.h3
                  className="text-2xl font-bold mb-4 text-white"
                >
                  {title || (
                    <span className="text-gray-500 italic">Your Blog Title Here... ✨</span>
                  )}
                </motion.h3>

                <motion.div
                  className="prose prose-invert max-w-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {imageList.map((url, idx) => (
                    <motion.img
                      key={idx}
                      src={url}
                      alt={`Blog visual ${idx + 1}`}
                      className="mt-4 rounded-xl max-w-full shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      whileHover={{ scale: 1.02 }}
                    />
                  ))}

                  <motion.div
                    className="mt-6 leading-relaxed text-gray-200"
                  >
                    {content ? (
                      <p className="whitespace-pre-wrap">{content}</p>
                    ) : (
                      <p className="text-gray-500 italic">
                        Your amazing blog content will appear here... Start writing to see the magic! 🌟
                      </p>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
