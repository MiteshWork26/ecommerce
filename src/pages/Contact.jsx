import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const Contact = () => {
    return (
        <div className="bg-white min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h5 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">Get in Touch</h5>
                    <h1 className="text-5xl font-serif font-bold mb-8">We'd love to hear directly from you.</h1>
                    <p className="text-gray-500 mb-12 text-lg leading-relaxed">
                        Whether you have a question about our products, need assistance with an order, or just want to discuss the latest trends, our team is here to help.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-gray-50 rounded-full text-accent">
                                <FiMapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Visit Us</h3>
                                <p className="text-gray-500">123 Fashion Avenue</p>
                                <p className="text-gray-500">New York, NY 10012</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-gray-50 rounded-full text-accent">
                                <FiMail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
                                <p className="text-gray-500">concierge@luxethreads.com</p>
                                <p className="text-gray-500">press@luxethreads.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-gray-50 rounded-full text-accent">
                                <FiPhone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                                <p className="text-gray-500">+1 (555) 123-4567</p>
                                <p className="text-gray-400 text-sm mt-1">Mon-Fri, 9am - 6pm EST</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-gray-50 p-8 md:p-12 rounded-2xl"
                >
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                                <input type="text" className="w-full bg-white border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:border-accent transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                                <input type="text" className="w-full bg-white border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:border-accent transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                            <input type="email" className="w-full bg-white border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:border-accent transition-colors" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                            <textarea rows="4" className="w-full bg-white border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:border-accent transition-colors"></textarea>
                        </div>

                        <button type="button" className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-accent transition-colors duration-300">
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
