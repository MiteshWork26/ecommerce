import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../api/axios';

const NewArrivals = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await api.get('/items');
                // Simulate "New" by reversing the array to show latest added first
                // In a real app we would sort by createdAt on backend
                setItems(data.reverse());
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 min-h-screen">
            <div className="text-center mb-16">
                <span className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Just Dropped</span>
                <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">New Arrivals</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Be the first to wear our latest styles. Fresh off the runway and ready for your wardrobe.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {items.map(item => (
                        <ProductCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewArrivals;
