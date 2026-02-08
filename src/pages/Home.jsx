import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setSubscribing(true);
    try {
      await api.post("/newsletter", { email });
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Subscription failed");
    } finally {
      setSubscribing(false);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await api.get("/items");
        setFeaturedItems(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch items", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <>
      <Hero />

      {/* Featured Section */}
      <section className="py-32 px-6 lg:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 border-b border-gray-100 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent block mb-2">
              Curated Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary">
              Essential Collection
            </h2>
          </motion.div>
          <Link
            to="/listing"
            className="hidden md:block text-xs font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-all mt-6 md:mt-0"
          >
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {featuredItems.map((item, index) => (
            <div key={item._id} style={{ transitionDelay: `${index * 100}ms` }}>
              <ProductCard item={item} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center md:hidden">
          <Link to="/listing" className="btn-primary inline-block">
            View All Products
          </Link>
        </div>
      </section>

      {/* Editorial Section / Why Shop */}
      <section className="bg-[#111] text-white py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="aspect-[4/5] bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute -bottom-10 lg:-right-10 -right-5 lg:w-48 lg:h-48 w-32 h-32 border border-white/20 rounded-full items-center justify-center backdrop-blur-sm hidden md:flex">
              <span className="text-xs uppercase tracking-widest text-center">
                Premium
                <br />
                Quality
              </span>
            </div>
          </div>

          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-6 block"
            >
              The Philosophy
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-serif mb-8 leading-tight"
            >
              Sustainable Luxury for the Modern Era.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-400 text-lg leading-relaxed mb-12 font-light"
            >
              We believe in quality over quantity. Each piece is crafted with
              the utmost care, using strictly sustainable materials that not
              only look good but feel good. Elevate your wardrobe with pieces
              that stand the test of time.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-8">
              <div>
                <h4 className="font-serif text-xl mb-2">Ethical</h4>
                <p className="text-sm text-gray-500">
                  Fair trade certified production.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2">Timeless</h4>
                <p className="text-sm text-gray-500">
                  Designs that never fade.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2">Global</h4>
                <p className="text-sm text-gray-500">
                  Free shipping worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Footer Pre */}
      <section className="py-24 bg-accent text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Join the Inner Circle
          </h2>
          <p className="mb-8 opacity-90">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              className="flex-1 bg-white/10 border border-white/30 px-6 py-4 placeholder-white/60 focus:outline-none focus:bg-white/20 transition-all text-white"
            />
            <button
              disabled={subscribing}
              className="bg-white text-accent px-10 py-4 uppercase text-xs font-bold tracking-widest hover:bg-black hover:text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {subscribing ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
