"use client";

import { useEffect } from "react";

export default function HtmlToPdfLoader() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.async = true;
      script.onload = () => {
        console.log("html2pdf.js loaded successfully");
      };
      script.onerror = () => {
        console.error("Failed to load html2pdf.js from CDN");
      };
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);
  
  return null;
}
