import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative h-screen w-full bg-[#EAEAEA] overflow-hidden flex items-center justify-center">
      {/* Background with blend mode */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/50 to-transparent z-10 sm:hidden"></div>

      <div className="absolute inset-0 z-0 max-h-[calc(100vh-90px)]">
        <div className="block md:grid md:grid-cols-2 h-full w-full">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full bg-[url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center"
          />
          <motion.div
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="hidden md:block h-full w-full bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center"
          />
        </div>
        {/* Dark Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      <div className="relative z-20 text-center text-white px-4">
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="uppercase tracking-[0.3em] text-sm md:text-base font-semibold mb-4 drop-shadow-md"
        >
          Spring / Summer 2026
        </motion.p>
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-6xl md:text-9xl font-serif font-black tracking-tight mb-8 text-accent"
        >
          ELEGANCE
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <Link
            to="/listing"
            className="inline-block border border-accent text-accent px-10 py-4 uppercase tracking-widest text-sm hover:bg-accent hover:text-black transition-colors duration-300 font-bold"
          >
            Discover Collection
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
