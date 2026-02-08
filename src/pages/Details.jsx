import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import {
  FiShoppingBag,
  FiTruck,
  FiStar,
  FiCheck,
  FiShare2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../components/ProductCard";

import { toast } from "sonner";

const Details = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  const fetchItem = async () => {
    try {
      const { data } = await api.get(`/items/${id}`);
      setItem(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (categoryId) => {
    try {
      const { data } = await api.get(`/items`);

      const filtered = data.filter(
        (product) =>
          product.category._id === categoryId && product.name !== item.name,
      );
      setRelatedProducts(filtered);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  useEffect(() => {
    if (item?.category?._id) {
      fetchRelatedProducts(item.category._id);
    }
  }, [item]);

  // Smooth scroll to top when product changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: `Check out this ${item.name} on LuxeThreads!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handlePreviousImage = () => {
    setActiveImage((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };

  if (loading)
    return (
      <div className="flex h-screen justify-center items-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <div className="text-sm uppercase tracking-widest text-gray-500">
            Loading Luxury...
          </div>
        </div>
      </div>
    );

  if (!item) return <div className="text-center py-20">Item not found</div>;

  const reviews = item.reviews || [];

  return (
    <div className="bg-white min-h-screen">
      {/* Product Section */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 pt-6 md:pt-12 pb-6 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-6">
          {/* Left Column: Images */}
          <div className="space-y-4 lg:sticky lg:top-32 h-fit">
            <div className="flex gap-4">
              {/* Vertical Thumbnail Gallery */}
              <div className="hidden lg:flex flex-col gap-2 w-20">
                {item.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square w-full overflow-hidden rounded-sm border-2 transition-all ${
                      activeImage === index
                        ? "border-primary shadow-lg"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-1 aspect-[3/4] md:aspect-[4/5] max-md:max-h-[300px] w-full bg-gray-50 overflow-hidden rounded-sm relative group cursor-pointer"
                onClick={() => setShowFullscreen(true)}
              >
                <img
                  src={item.images[activeImage]}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-black/50 rounded-full p-3">
                    <FiShare2 size={20} />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile Thumbnail Carousel */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-2">
              {item.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square w-20 flex-shrink-0 overflow-hidden rounded-sm border-2 transition-all ${
                    activeImage === index
                      ? "border-primary shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${item.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col justify-center pt-4 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start border-b border-gray-100 pb-2 gap-2">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">
                    {item.category?.name || "Collection"}
                  </h2>
                  <h1 className="text-xl md:text-2xl font-serif text-primary mb-3 leading-tight">
                    {item.name}
                  </h1>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex text-accent text-base">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          fill={
                            i < Math.round(item.rating || 0)
                              ? "currentColor"
                              : "none"
                          }
                          className={
                            i < Math.round(item.rating || 0)
                              ? ""
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-primary transition-colors">
                      {item.numReviews} Reviews
                    </span>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-2xl md:text-3xl font-serif text-primary">
                    <span className="line-through text-gray-500 text-xl md:text-2xl">
                      ₹{item.price.toLocaleString()}
                    </span>{" "}
                    ₹{item.offerPrice.toLocaleString()}
                  </div>
                  {item.availability ? (
                    <div className="text-[10px] uppercase font-bold tracking-widest text-green-600 mt-2 flex items-center md:justify-end gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>{" "}
                      In Stock
                    </div>
                  ) : (
                    <div className="text-[10px] uppercase font-bold tracking-widest text-red-500 mt-2">
                      Out of Stock
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-4 font-light pt-2">
                {item.description}
              </p>

              {/* Actions */}
              <div className="space-y-4 md:space-y-6 mb-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <div className="border border-gray-200 flex items-center h-11 w-full sm:w-32 px-4 bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 py-0 text-gray-400 hover:text-black transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-full text-center focus:outline-none font-medium bg-transparent"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 py-0 text-gray-400 hover:text-black transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      for (let i = 0; i < quantity; i++) addToCart(item);
                    }}
                    disabled={!item.availability}
                    className="flex-1 btn-primary h-14 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <FiShoppingBag size={18} /> Add to Cart
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={handleShare}
                    className="h-12 border border-black/10 flex items-center justify-center gap-2 text-xs uppercase font-bold tracking-widest hover:border-black text-gray-700 hover:text-black hover:bg-white transition-all"
                  >
                    <FiShare2 size={16} />
                    Share
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gray-50/50 border border-gray-100 p-6 space-y-4 rounded-sm">
                <div className="flex items-start gap-3">
                  <FiTruck className="text-accent mt-0.5 shrink-0" size={18} />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-1">
                      Free Shipping & Returns
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Complimentary standard shipping on all orders. Returns are
                      accepted within 30 days of purchase.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheck className="text-accent mt-0.5 shrink-0" size={18} />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-1">
                      Authenticity Guaranteed
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Every item is verified for authenticity and quality by our
                      expert team.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="border-t border-gray-100 bg-gray-50 py-8">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-serif font-bold">
                You may also like these Products
              </h2>
            </div>

            {relatedProducts.length > 0 && (
              <div className="relative">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={2}
                  breakpoints={{
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                  className="related-products-swiper"
                >
                  {relatedProducts.map((product) => (
                    <SwiperSlide key={product._id}>
                      <ProductCard item={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {relatedProducts.length === 0 && item && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No related products found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setShowFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowFullscreen(false)}
                className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors"
              >
                <FiX size={24} />
              </button>

              {/* Previous Button */}
              {item.images.length > 1 && (
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-4 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors"
                >
                  <FiChevronLeft size={24} />
                </button>
              )}

              {/* Next Button */}
              {item.images.length > 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors"
                >
                  <FiChevronRight size={24} />
                </button>
              )}

              {/* Fullscreen Image */}
              <img
                src={item.images[activeImage]}
                alt={`${item.name} - Fullscreen view`}
                className="max-w-full max-h-full object-contain"
              />

              {/* Image Counter */}
              {item.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                  {activeImage + 1} / {item.images.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Details;
