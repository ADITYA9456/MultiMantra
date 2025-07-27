import ChatBot from "@/component/ChatBot";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";
import Wrapper from "@/component/Sessionwraper";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MultiMantra - Your All-in-One Digital Services Platform",
  description: "MultiMantra offers link shortening, blog services, and more digital solutions for your needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Wrapper>
        <Navbar />
        <div className ="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] "> {children}</div>
          <Footer/>
          <ChatBot />
          </Wrapper>
      </body>
    </html>
  );
}
