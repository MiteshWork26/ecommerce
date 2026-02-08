import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiBox, FiUsers, FiGlobe } from 'react-icons/fi';

const About = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                        alt="Atelier"
                        className="w-full h-full object-cover grayscale brightness-50"
                    />
                </div>
                <div className="relative z-10 text-center text-white p-6">
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "0.5em" }}
                        animate={{ opacity: 1, letterSpacing: "0.2em" }}
                        transition={{ duration: 1 }}
                        className="text-xs uppercase font-bold text-accent mb-4 block"
                    >
                        Est. 2024
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-serif font-medium mb-6"
                    >
                        The Art of Cloth
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-white/80 max-w-2xl mx-auto text-lg font-light leading-relaxed"
                    >
                        Bridging the gap between high-end fashion and everyday accessibility.
                    </motion.p>
                </div>
            </div>

            {/* Narrative Section */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div {...fadeIn}>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Our Methodology</h2>
                        <h3 className="text-4xl font-serif mb-8 leading-tight">Crafting pieces that transcend seasons.</h3>
                        <p className="text-gray-500 mb-6 leading-relaxed">
                            LuxeThreads emerged from a desire to slow down the fast-paced world of fashion. We believe that style is a form of self-expression that should be effortless, sustainable, and timeless.
                        </p>
                        <p className="text-gray-500 leading-relaxed">
                            Our team of curators travels the globe to select pieces that meet our rigorous standards for quality, design, and ethical production. From Italian leather accessories to organic cotton staples, every item in our collection tells a story.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="aspect-[4/5] bg-gray-100 relative group overflow-hidden"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1551232864-3f52236a2629?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            alt="Craftsmanship"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="bg-[#111] text-white py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-4 gap-12"
                    >
                        <div className="space-y-4">
                            <FiTarget size={32} className="text-accent" />
                            <h4 className="font-serif text-xl">Precision</h4>
                            <p className="text-white/60 text-sm leading-relaxed">Every stitch is calculated. Precision in tailoring ensuring the perfect fit for every silhouette.</p>
                        </div>
                        <div className="space-y-4">
                            <FiBox size={32} className="text-accent" />
                            <h4 className="font-serif text-xl">Sourcing</h4>
                            <p className="text-white/60 text-sm leading-relaxed">We source only from ethical suppliers using sustainable materials that minimize environmental impact.</p>
                        </div>
                        <div className="space-y-4">
                            <FiUsers size={32} className="text-accent" />
                            <h4 className="font-serif text-xl">Community</h4>
                            <p className="text-white/60 text-sm leading-relaxed">Fashion is about people. We support fair wages and safe working conditions for all our artisans.</p>
                        </div>
                        <div className="space-y-4">
                            <FiGlobe size={32} className="text-accent" />
                            <h4 className="font-serif text-xl">Global</h4>
                            <p className="text-white/60 text-sm leading-relaxed">Drawing inspiration from culture worldwide to create a universally appealing aesthetic.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Team / Closing */}
            <section className="py-24 px-6 max-w-5xl mx-auto text-center">
                <motion.h2 {...fadeIn} className="text-4xl md:text-5xl font-serif mb-8">Ready to elevate your wardrobe?</motion.h2>
                <motion.p {...fadeIn} className="text-gray-500 mb-12 max-w-2xl mx-auto">
                    Join thousands of others who have discovered the difference of mindful consumption.
                </motion.p>
                {/* Could add a signature or founder image here */}
            </section>
        </div>
    );
};

export default About;
