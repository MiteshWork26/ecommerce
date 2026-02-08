import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import api from '../api/axios';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            // Fetch wishlist on user change (login/load)
            const fetchWishlist = async () => {
                try {
                    const { data } = await api.get('/users/profile');
                    setWishlist(data.wishlist || []);
                } catch (error) {
                    console.error("Failed to load wishlist", error);
                }
            };
            fetchWishlist();
        } else {
            setWishlist([]); // Clear on logout
        }
    }, [user]);

    const addToWishlist = async (item) => {
        if (!user) {
            toast.error('Please login to use wishlist');
            return;
        }
        // Optimistic update
        setWishlist(prev => [...prev, item]);
        try {
            const { data } = await api.post('/users/wishlist', { itemId: item._id });
            setWishlist(data); // Sync with server response
            toast.success('Added to wishlist');
        } catch (error) {
            setWishlist(prev => prev.filter(i => i._id !== item._id)); // Revert
            toast.error('Failed to add to wishlist');
        }
    };

    const removeFromWishlist = async (itemId) => {
        if (!user) return;
        // Optimistic
        const oldList = wishlist;
        setWishlist(prev => prev.filter(item => item._id !== itemId));
        try {
            const { data } = await api.post('/users/wishlist', { itemId });
            setWishlist(data);
            toast.success('Removed from wishlist');
        } catch (error) {
            setWishlist(oldList);
            toast.error('Failed to remove from wishlist');
        }
    };

    const isInWishlist = (itemId) => {
        return wishlist.some((item) => item._id === itemId);
    };

    const toggleWishlist = async (item) => {
        if (!user) {
            toast.error('Please login to use wishlist');
            return;
        }

        const exists = isInWishlist(item._id);

        // Optimistic UI update
        if (exists) {
            setWishlist(prev => prev.filter(i => i._id !== item._id));
            toast.dismiss();
            // toast.success('Removed from wishlist');
        } else {
            setWishlist(prev => [...prev, item]);
            toast.dismiss();
            // toast.success('Added to wishlist');
        }

        try {
            const { data } = await api.post('/users/wishlist', { itemId: item._id });
            setWishlist(data); // Ensure absolute sync
            if (exists) toast.success('Removed from wishlist');
            else toast.success('Added to wishlist');
        } catch (error) {
            console.error(error);
            // Revert on error could be complex here, usually rely on refresh or simple error toast
            toast.error('Failed to update wishlist');
            // Force refresh to be safe
            try {
                const { data } = await api.get('/users/profile');
                setWishlist(data.wishlist || []);
            } catch (e) { }
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
