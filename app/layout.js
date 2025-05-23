import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import Wrapper from "@/component/Sessionwraper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          </Wrapper>
      </body>
    </html>
  );
}
