import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiSearch,
  FiLogOut,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/listing?keyword=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all left-0 top-0 duration-500 ${scrolled ? "bg-white/90 backdrop-blur-md pb-4 shadow-sm" : "bg-transparent pb-4"}`}
    >
      <div className="bg-black text-white py-0.5 overflow-hidden whitespace-nowrap">
        <marquee>
          Buy 1 get 3 free &nbsp;&nbsp;&nbsp;&nbsp; Enjoy Free Shipping on
          Orders Over ₹399 &nbsp;&nbsp;&nbsp;&nbsp; Special Offer: 3 Items @
          ₹999 on Orders Above ₹2,000
        </marquee>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-2">
        <div className="flex justify-between items-center relative">
          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-serif font-bold tracking-tighter ${scrolled ? "text-gray-900" : "text-gray-900"}`}
          >
            LUXE<span className="text-accent">.</span>
          </Link>

          {/* Desktop Menu Centered */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="group relative py-1">
              <span className="text-sm font-medium uppercase tracking-widest text-gray-900 transition-colors group-hover:text-accent">
                Home
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 origin-left"></span>
            </Link>
            <Link to="/listing" className="group relative py-1">
              <span className="text-sm font-medium uppercase tracking-widest text-gray-900 transition-colors group-hover:text-accent">
                Collection
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 origin-left"></span>
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="relative flex items-center justify-end">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onSubmit={handleSearch}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-100 shadow-xl rounded-full flex items-center overflow-hidden z-20"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search items..."
                      autoFocus
                      className="w-full px-5 py-2.5 text-sm text-primary placeholder-gray-400 focus:outline-none bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-accent transition-colors border-l border-gray-100"
                    >
                      <FiX size={18} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <motion.button
                layout
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`text-primary hover:text-accent transition-colors p-2 rounded-full hover:bg-gray-100/50 ${isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              >
                <FiSearch size={22} />
              </motion.button>
            </div>

            <Link
              to="/cart"
              className="relative text-gray-900 hover:text-accent transition-colors"
            >
              <FiShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <Link to="/cart" className="relative text-gray-900">
              <FiShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white fixed inset-0 z-[60] pt-24 px-6 flex flex-col items-center gap-8"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-900 hover:text-accent transition-colors"
            >
              <FiX size={28} />
            </button>

            <form onSubmit={handleSearch} className="w-full relative max-w-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH..."
                className="w-full border-b border-gray-200 py-3 text-center text-sm font-medium uppercase tracking-widest focus:outline-none focus:border-accent placeholder-gray-400 bg-transparent"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent transition-colors"
              >
                <FiSearch size={20} />
              </button>
            </form>

            <div className="flex flex-col items-center gap-4 w-full">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-xl font-medium uppercase tracking-widest text-gray-900 hover:text-accent transition-colors"
              >
                Home
              </Link>
              <Link
                to="/listing"
                onClick={() => setIsOpen(false)}
                className="text-xl font-medium uppercase tracking-widest text-gray-900 hover:text-accent transition-colors"
              >
                Collection
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
