import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const ProductCard = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="group"
    >
      <div className="relative aspect-[3/4] max-h-[170px] w-full overflow-hidden bg-[#f0f0f0]">
        <Link to={`/items/${item._id}`}>
          <motion.img
            src={item.image}
            alt={item.name}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Status Label */}
        {!item.availability && (
          <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest bg-black text-white px-2 py-1">
            Sold Out
          </span>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-white/90 backdrop-blur-sm flex justify-between items-center z-10">
          <button
            onClick={() => addToCart(item)}
            disabled={!item.availability}
            className="uppercase text-xs font-bold tracking-widest hover:text-accent transition-colors disabled:text-gray-400"
          >
            Add to Cart
          </button>
          <Link
            to={`/items/${item._id}`}
            className="text-primary hover:text-accent transition-colors"
          >
            <FiEye size={20} />
          </Link>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mb-1">
          {item.category?.name}
        </p>
        <Link to={`/items/${item._id}`}>
          <h3 className="font-serif md:text-lg text-sm text-primary hover:text-accent transition-colors">
            {item.name}
          </h3>
        </Link>
        <p className="text-sm md:text-md font-medium mt-1 text-gray-500">
          <span className="line-through text-xs md:text-sm">₹{item.price}</span>{" "}
          ₹{item.offerPrice}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
