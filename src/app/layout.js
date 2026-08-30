import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Home/Navbar";
import Footer from "@/Components/Home/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Drivly - Premium Mobility, Refined, Fast, Reliable",
  description: "Drivly is a premium mobility service offering refined, fast, and reliable vehicle rentals. Discover our fleet of luxury cars and enjoy a seamless booking experience.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer></Footer>
        <Toaster />
        </body>
    </html>
  );
}
