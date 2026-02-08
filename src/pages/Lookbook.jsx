import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Lookbook = () => {
    // Using a list of high-quality fashion images that share a cohesive aesthetic
    const looks = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            title: "Urban Minimalist",
            span: "row-span-2"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            title: "Evening Silk",
            span: "row-span-1"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            title: "Accessory Focus",
            span: "col-span-1"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            title: "Summer Breeze",
            span: "row-span-2"
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            title: "Structured Layers",
            span: "row-span-1"
        },
        // {
        //     id: 6,
        //     image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        //     title: "Winter Coat",
        //     span: "col-span-2"
        // }
    ];

    return (
        <div className="bg-white min-h-screen pt-20 pb-24">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-serif mb-6"
                    >
                        LOOKBOOK
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-500 uppercase tracking-widest text-xs"
                    >
                        Spring / Summer 2026 Collection
                    </motion.p>
                </div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                    {looks.map((look, index) => (
                        <motion.div
                            key={look.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`relative group overflow-hidden bg-gray-100 ${look.span}`}
                        >
                            <img
                                src={look.image}
                                alt={look.title}
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-white">
                                <h3 className="font-serif text-2xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{look.title}</h3>
                                <Link to="/listing" className="text-xs uppercase font-bold tracking-widest border-b border-white pb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">Shop the Look</Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link to="/listing" className="btn-primary inline-block px-12 py-4 uppercase text-xs font-bold tracking-widest">
                        View All Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Lookbook;
