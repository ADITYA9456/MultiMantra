"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Link = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const createTree = () => {
    if (text.trim()) {
      router.push(`/generate?handle=${text}`);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient mesh */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 80% 80%, rgba(236,72,153,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 40% 60%, rgba(59,130,246,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.15) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0"
        />

        {/* Floating link elements */}
        {isClient &&
          Array.from({ length: 15 }).map((_, i) => {
            const icons = [
              "🔗",
              "✨",
              "🌟",
              "💫",
              "🎯",
              "🚀",
              "💎",
              "🌈",
              "⚡",
              "🎨",
              "🔮",
              "💻",
              "📱",
              "🌍",
              "🎭",
            ];
            const icon = icons[i % icons.length];
            const size = Math.random() * 20 + 15;

            return (
              <motion.div
                key={`link-icon-${i}`}
                className="absolute opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${size}px`,
                }}
                animate={{
                  y: [0, -50, 0],
                  x: [0, Math.random() * 60 - 30, 0],
                  rotate: [0, 360],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 12 + 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
              >
                {icon}
              </motion.div>
            );
          })}

        {/* Large floating orbs */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 120, 0],
            y: [0, -60, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1.3, 1, 1.5],
            x: [0, -100, 0],
            y: [0, 80, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />

        {/* Smaller floating orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 60, 0],
            y: [0, -40, 0],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl"
        />
      </div>

      {/* Main Content Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12 relative z-10 pt-32">
        <div className="max-w-7xl mx-auto text-center">
          {/* Enhanced Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="text-white space-y-8 mb-12"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight"
              animate={{
                textShadow: [
                  "0 0 20px rgba(168,85,247,0.5)",
                  "0 0 40px rgba(236,72,153,0.5)",
                  "0 0 20px rgba(168,85,247,0.5)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Your Digital Identity. <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  backgroundPosition: { duration: 3, repeat: Infinity },
                }}
              >
                Neatly Nested.
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="w-40 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
            />

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-lg md:text-xl max-w-4xl mx-auto text-gray-300 leading-relaxed"
            >
              We help you organize all your important links, content, and socials in
              one beautiful, customizable page. Whether you're a creator,
              entrepreneur, or brand — make your online presence unforgettable.
            </motion.p>
          </motion.div>

          {/* Enhanced Input Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-700/50 max-w-3xl mx-auto relative overflow-hidden"
          >
            {/* Card background animation */}
            <motion.div
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(168,85,247,0.05) 0%, transparent 50%)",
                  "linear-gradient(135deg, rgba(236,72,153,0.05) 0%, transparent 50%)",
                  "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, transparent 50%)",
                  "linear-gradient(135deg, rgba(168,85,247,0.05) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl"
            />

            <div className="relative z-10">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-purple-400">🔗</span>
                Claim Your LinkNest
                <span className="text-pink-400">✨</span>
              </motion.h2>

              <motion.p
                className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Choose your unique username and start building your digital presence
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <div className="flex-1 w-full relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-lg"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <motion.input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && createTree()}
                    type="text"
                    placeholder="yourusername"
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-6 py-4 text-lg rounded-full bg-gray-800/80 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700/50 transition-all duration-300 relative z-10"
                  />

                  <motion.div
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-xl"
                    animate={{
                      x: [0, 5, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🌐
                  </motion.div>
                </div>

                <motion.button
                  onClick={createTree}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(168,85,247,0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-purple-500/25 whitespace-nowrap"
                  animate={{
                    boxShadow: [
                      "0 4px 20px rgba(168,85,247,0.2)",
                      "0 8px 30px rgba(168,85,247,0.4)",
                      "0 4px 20px rgba(168,85,247,0.2)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🚀 Claim your LinkNest
                </motion.button>
              </motion.div>

              {/* Features Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700/30"
                >
                  <div className="text-3xl mb-2">🎨</div>
                  <h3 className="text-white font-semibold mb-1">Customizable</h3>
                  <p className="text-gray-400 text-sm">Beautiful themes and colors</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700/30"
                >
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="text-white font-semibold mb-1">Fast & Secure</h3>
                  <p className="text-gray-400 text-sm">Lightning fast loading</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700/30"
                >
                  <div className="text-3xl mb-2">📱</div>
                  <h3 className="text-white font-semibold mb-1">Mobile Ready</h3>
                  <p className="text-gray-400 text-sm">Perfect on all devices</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-16 text-center pb-16"
          >
            <motion.p
              className="text-gray-400 text-sm mb-4"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Join thousands of creators building their digital presence
            </motion.p>

            <div className="flex justify-center gap-6">
              <motion.div
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/30"
                animate={{
                  boxShadow: [
                    "0 4px 20px rgba(168,85,247,0.1)",
                    "0 8px 30px rgba(168,85,247,0.2)",
                    "0 4px 20px rgba(168,85,247,0.1)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-purple-400 font-medium text-sm">
                  ✨ Powered by MultiMantra
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Link;
