import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName = 'item' }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white text-secondary w-full max-w-md rounded-xl shadow-2xl overflow-hidden"
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-serif font-bold text-primary flex items-center gap-2">
                                <FiAlertTriangle className="text-accent" />
                                Confirm Deletion
                            </h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-primary transition-colors">
                                <FiX size={24} />
                            </button>
                        </div>

                        <p className="text-gray-600 mb-8">
                            Are you sure you want to delete this {itemName}? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-primary border border-transparent hover:border-primary rounded-lg transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-white bg-primary hover:bg-black rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                            >
                                Delete {itemName}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DeleteConfirmationModal;
