import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import api from "../api/axios";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const Listing = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const keywordParam = searchParams.get("keyword");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [itemsRes, categoriesRes] = await Promise.all([
          api.get("/items"),
          api.get("/categories"),
        ]);
        setItems(itemsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryParam, keywordParam]);

  // Group items by category
  const itemsByCategory = categories.map((category) => {
    const categoryItems = items.filter(
      (item) =>
        item.category?.name?.toLowerCase() === category.name.toLowerCase(),
    );
    return {
      category,
      items: categoryItems,
    };
  });

  // Filter items based on keyword search only
  const filteredItemsByCategory = itemsByCategory
    .map(({ category, items }) => {
      const filteredItems = items.filter((item) => {
        if (keywordParam) {
          return (
            item.name.toLowerCase().includes(keywordParam.toLowerCase()) ||
            item.description.toLowerCase().includes(keywordParam.toLowerCase())
          );
        }
        return true;
      });
      return {
        category,
        items: filteredItems,
      };
    })
    .filter(({ items }) => items.length > 0);

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-2 min-h-screen">
      {/* Header */}
      <div className="mb-3 text-center">
        <h1 className="text-2xl font-serif text-primary">All Products</h1>
        {keywordParam && (
          <p className="text-gray-400 text-sm">
            Search results for "{keywordParam}"
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {filteredItemsByCategory.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No items found matching your criteria.
              <button
                onClick={() => setSearchParams({})}
                className="block mx-auto mt-4 text-accent underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItemsByCategory.map(({ category, items }) => (
                <div key={category._id}>
                  {/* Category Header */}
                  <div className="mb-2">
                    <h2 className="text-xl font-serif text-primary capitalize">
                      {category.name?.split("-")?.join(" ")}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {items.length} products
                    </p>
                  </div>

                  {/* Products Grid */}
                  <div className="md:hidden mb-2">
                    <Swiper
                      spaceBetween={16}
                      slidesPerView={2}
                      className="w-full"
                      breakpoints={{
                        320: {
                          slidesPerView: 2,
                          spaceBetween: 16,
                        },
                      }}
                    >
                      {items.map((item) => (
                        <SwiperSlide key={item._id}>
                          <ProductCard item={item} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  <div className="hidden md:grid grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {items.map((item) => (
                      <ProductCard key={item._id} item={item} />
                    ))}
                  </div>

                  {/* Add Section After Category */}
                  <div className="p-2 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-primary transition-colors">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Listing;
