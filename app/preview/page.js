"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

// Button component
function Button({ children, onClick, className = "", icon = null }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${className} hover:opacity-90`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}

export default function PreviewPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    images: []
  });

  useEffect(() => {
    setIsClient(true);
    
    // Get blog data from localStorage (set by the blog page)
    const storedData = localStorage.getItem("previewBlogData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setBlogData(parsedData);
      } catch (error) {
        console.error("Error parsing blog data:", error);
      }
    } else {
      // If no data, redirect back to blog page
      router.push("/blog");
    }
  }, [router]);

  // Function to generate reading time
  const readingTime = Math.ceil((blogData.content?.split(' ').length || 0) / 200);

  // Function to download as PDF
  const downloadAsPDF = () => {
    if (typeof window === "undefined") {
      return;
    }
    
    // Check if html2pdf is loaded
    if (!window.html2pdf) {
      alert("PDF generator is loading. Please wait a moment and try again.");
      
      // Try loading it directly
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = downloadAsPDF;  // Retry when loaded
      document.head.appendChild(script);
      return;
    }
    
    // Show loading indicator
    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'Generating PDF...';
    loadingMessage.style.position = 'fixed';
    loadingMessage.style.top = '50%';
    loadingMessage.style.left = '50%';
    loadingMessage.style.transform = 'translate(-50%, -50%)';
    loadingMessage.style.backgroundColor = '#000000';
    loadingMessage.style.color = '#ffffff';
    loadingMessage.style.padding = '20px';
    loadingMessage.style.borderRadius = '5px';
    loadingMessage.style.zIndex = '9999';
    document.body.appendChild(loadingMessage);
    
    // Create a fresh container for PDF
    const pdfContainer = document.createElement('div');
    pdfContainer.style.width = '210mm'; // A4 width
    pdfContainer.style.padding = '20mm';
    pdfContainer.style.backgroundColor = '#ffffff';
    pdfContainer.style.color = '#000000';
    pdfContainer.style.fontFamily = 'Arial, sans-serif';
    
    // Add title
    const title = document.createElement('h1');
    title.textContent = blogData.title || 'Untitled Blog';
    title.style.fontSize = '24pt';
    title.style.marginBottom = '15pt';
    title.style.textAlign = 'center';
    title.style.color = '#333333';
    pdfContainer.appendChild(title);
    
    // Add date
    const date = document.createElement('p');
    date.textContent = new Date().toLocaleDateString();
    date.style.textAlign = 'center';
    date.style.marginBottom = '25pt';
    date.style.color = '#666666';
    pdfContainer.appendChild(date);
      
    const processImages = (images, currentIndex, finalCallback) => {
      if (!images || images.length === 0 || currentIndex >= images.length) {
        finalCallback();
        return;
      }
      
      const url = images[currentIndex];
      const imgWrapper = document.createElement('div');
      imgWrapper.style.textAlign = 'center';
      imgWrapper.style.margin = '15pt 0';
      imgWrapper.style.pageBreakInside = 'avoid';
      
      // Try to get image as base64
      if (typeof window.getImageAsBase64 === 'function') {
        window.getImageAsBase64(url, (dataUrl) => {
          const img = document.createElement('img');
          img.src = dataUrl;
          img.alt = `Blog image ${currentIndex + 1}`;
          img.style.maxWidth = '100%';
          img.style.maxHeight = '400px';
          img.style.margin = '0 auto';
          img.style.display = 'block';
          img.style.border = '1px solid #dddddd';
          img.style.borderRadius = '4px';
          img.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          
          imgWrapper.appendChild(img);
          pdfContainer.appendChild(imgWrapper);
          
          // Process next image
          processImages(images, currentIndex + 1, finalCallback);
        });
      } else {
        // Fallback if helper function not available
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Blog image ${currentIndex + 1}`;
        img.style.maxWidth = '100%';
        img.crossOrigin = 'Anonymous';
        
        imgWrapper.appendChild(img);
        pdfContainer.appendChild(imgWrapper);
        
        // Process next image
        processImages(images, currentIndex + 1, finalCallback);
      }
    };
    
    // Handle content and PDF generation
    const generatePDFWithContent = () => {
      // Add blog content
      const contentDiv = document.createElement('div');
      contentDiv.style.fontSize = '12pt';
      contentDiv.style.lineHeight = '1.5';
      contentDiv.style.whiteSpace = 'pre-wrap';
      contentDiv.style.marginTop = '20pt';
      contentDiv.style.textAlign = 'justify';
      
      // Format content with proper paragraphs
      const formattedContent = blogData.content.split('\n').filter(para => para.trim().length > 0);
      formattedContent.forEach((paragraph, index) => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        p.style.marginBottom = '10pt';
        contentDiv.appendChild(p);
      });
      
      pdfContainer.appendChild(contentDiv);
      
      // Configure PDF options
      const opt = {
        margin: [15, 15, 15, 15],
        filename: `${blogData.title || 'blog'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          letterRendering: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      // Append to document temporarily
      document.body.appendChild(pdfContainer);
      pdfContainer.style.position = 'absolute';
      pdfContainer.style.left = '-9999px';
      
      // Generate PDF
      window.html2pdf().from(pdfContainer).set(opt).save()
        .then(() => {
          // Clean up
          document.body.removeChild(pdfContainer);
          document.body.removeChild(loadingMessage);
        })
        .catch(error => {
          console.error("Error generating PDF:", error);
          alert("Error generating PDF. Please try again.");
          document.body.removeChild(pdfContainer);
          document.body.removeChild(loadingMessage);
        });
    };
    
    // Process images first, then generate PDF with content
    if (blogData.images && blogData.images.length > 0) {
      processImages(blogData.images, 0, generatePDFWithContent);
    } else {
      generatePDFWithContent();
    }
  };

  // Function to download as TXT
  const downloadAsTXT = () => {
    // Create content with title, images (as URLs), and blog text
    let textContent = `${blogData.title || 'Untitled Blog'}\n`;
    textContent += `${new Date().toLocaleDateString()}\n\n`;
    
    // Add image references
    if (blogData.images && blogData.images.length > 0) {
      textContent += "--- Images ---\n";
      blogData.images.forEach((url, index) => {
        textContent += `Image ${index + 1}: ${url}\n`;
      });
      textContent += "\n--- Content ---\n\n";
    }
    
    // Add main content
    textContent += blogData.content;
    
    // Create and download the file
    const element = document.createElement("a");
    const file = new Blob([textContent], { type: "text/plain" });
    
    element.href = URL.createObjectURL(file);
    element.download = `${blogData.title || 'blog'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Function to go back to edit
  const goBackToEdit = () => {
    router.push('/blog');
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
        strategy="afterInteractive"
        onLoad={() => console.log("html2pdf.js loaded via Next.js Script")}
      />
      <Script
        id="pdf-preparation"
        dangerouslySetInnerHTML={{
          __html: `
            // Utility function to convert image to base64 for PDF export
            function getImageAsBase64(url, callback) {
              const img = new Image();
              img.crossOrigin = 'Anonymous';
              img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(this, 0, 0);
                
                try {
                  const dataURL = canvas.toDataURL('image/jpeg');
                  callback(dataURL);
                } catch(e) {
                  console.error("Error converting image:", e);
                  callback(url); // Fallback to original URL
                }
              };
              img.onerror = function() {
                console.error("Error loading image:", url);
                callback(url); // Fallback to original URL
              };
              img.src = url;
            }
          `
        }}
      />
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient mesh */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 25% 25%, rgba(168,85,247,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 75% 75%, rgba(236,72,153,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 25% 25%, rgba(168,85,247,0.15) 0%, transparent 70%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0"
        />
        
        {/* Floating reading elements */}
        {isClient && Array.from({ length: 8 }).map((_, i) => {
          const icons = ["📖", "✨", "💭", "🌟", "📝", "💡", "🎨", "🔖"];
          const icon = icons[i % icons.length];
          const size = Math.random() * 15 + 10;
          return (
            <motion.div
              key={`reading-icon-${i}`}
              className="absolute opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${size}px`
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 40 - 20, 0],
                rotate: [0, 360],
                opacity: [0.05, 0.15, 0.05]
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            >
              {icon}
            </motion.div>
          );
        })}
        
        {/* Large floating orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 80, 0],
            y: [0, -40, 0],
            opacity: [0.08, 0.15, 0.08]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.4],
            x: [0, -60, 0],
            y: [0, 70, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
      </div>
      
      {/* Page Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="pt-32 pb-8 px-8 text-center relative z-10"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{
            backgroundPosition: { duration: 5, repeat: Infinity }
          }}
        >
          Blog Preview
        </motion.h1>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-32 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-500 mx-auto rounded-full"
        />
      </motion.div>
      
      {/* Content Section */}
      <div className="px-8 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Blog Content Container */}
          <motion.div
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-700/50 relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Card background animation */}
            <motion.div
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(168,85,247,0.05) 0%, transparent 50%)",
                  "linear-gradient(135deg, rgba(236,72,153,0.05) 0%, transparent 50%)",
                  "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, transparent 50%)",
                  "linear-gradient(135deg, rgba(168,85,247,0.05) 0%, transparent 50%)"
                ]
              }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl"
            />
            
            <div id="blog-container" className="relative z-10">
              {/* Blog Meta Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-6 text-gray-300 mb-8"
              >
                <motion.div
                  className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-md px-4 py-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-purple-400">📅</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-md px-4 py-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-blue-400">⏱️</span>
                  <span>{readingTime} min read</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-md px-4 py-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-green-400">🖼️</span>
                  <span>{blogData.images ? blogData.images.length : 0} images</span>
                </motion.div>
              </motion.div>
              
              {/* Blog Title */}
              <motion.h2
                className="text-4xl font-bold mb-8 text-white text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                {blogData.title || "Untitled Blog"}
              </motion.h2>
              
              {/* Images Gallery */}
              {blogData.images && blogData.images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="mb-12 space-y-8"
                >
                  {blogData.images.map((url, index) => (
                    <div key={index} className="relative h-64 sm:h-96 w-full">
                      <Image
                        src={url}
                        alt={`Blog image ${index + 1}`}
                        fill
                        className="object-cover rounded-2xl shadow-2xl"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 800px"
                        unoptimized={true} // Helps with PDF compatibility
                        priority={true} // Prioritize loading
                      />
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Blog Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap mt-8 mb-16"
              >
                {blogData.content}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
