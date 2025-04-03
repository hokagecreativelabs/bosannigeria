"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoginModal from "../auth/LoginModal";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleOpenLoginModal = () => setLoginModalOpen(true);
  const handleCloseLoginModal = () => setLoginModalOpen(false);

  return (
    <>
      <header className={`${scrolling ? "shadow-lg fixed top-0 left-0 right-0" : ""} bg-white transition-all duration-300 w-full`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div onClick={() => router.push("/")} className="flex items-center space-x-2 cursor-pointer">
              <div className="h-10 w-10 bg-[#0F2C59] rounded-full flex items-center justify-center">
                <span className="text-[#D4AF37] font-playfair font-bold text-lg">B</span>
              </div>
              <h1 className="text-[#0F2C59] font-playfair font-bold text-xl">BOSAN</h1>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex space-x-8 items-center">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About" },
                { path: "/events", label: "Events" },
                { path: "/members", label: "Members" },
                { path: "/contact", label: "Contact" }
              ].map(({ path, label }) => (
                <Link key={path} href={path} className={`font-medium cursor-pointer ${pathname === path ? "text-[#0F2C59]" : "text-[#343A40]"} hover:text-[#D4AF37] transition`}>
                  {label}
                </Link>
              ))}

              <Button className="bg-[#0F2C59] text-white px-5 py-2 rounded hover:bg-opacity-90 transition flex items-center space-x-2" onClick={handleOpenLoginModal}>
                <span>Member Login</span>
                <Lock className="h-4 w-4" />
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-[#0F2C59] hover:text-[#D4AF37]" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={toggleMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "5%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg z-50 flex flex-col"
            >
              <div className="flex justify-between items-center p-5">
                <h1 className="text-[#0F2C59] font-bold text-xl">Menu</h1>
                <button onClick={toggleMobileMenu}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col space-y-4 mt-4 p-6">
                {[
                  { path: "/", label: "Home" },
                  { path: "/about", label: "About" },
                  { path: "/events", label: "Events" },
                  { path: "/members", label: "Members" },
                  { path: "/contact", label: "Contact" }
                ].map(({ path, label }) => (
                  <Link key={path} href={path} className="text-lg text-[#343A40] font-medium hover:text-[#D4AF37] transition" onClick={toggleMobileMenu}>
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="p-6 mt-auto">
                <Button className="w-full bg-[#0F2C59] text-white px-5 py-3 rounded hover:bg-opacity-90 transition flex items-center justify-center space-x-2" onClick={handleOpenLoginModal}>
                  <span>Member Login</span>
                  <Lock className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LoginModal isOpen={loginModalOpen} onClose={handleCloseLoginModal} />
    </>
  );
};

export default Navbar;
