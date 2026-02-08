import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { FiGrid, FiBox, FiLayers, FiShoppingCart, FiMenu, FiX, FiHome, FiLogOut, FiBell, FiSearch, FiStar, FiTag } from 'react-icons/fi';
import { Toaster } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

import api from '../api/axios'; // Import api instance

const AdminLayout = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    // Notification State
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notificationOpen, setNotificationOpen] = useState(false);

    const fetchNotifications = async () => {
        try {
            const { data } = await api.get('/notifications');
            setNotifications(data.notifications);
            setUnreadCount(data.unreadCount);
        } catch (error) {
            console.error("Failed to fetch notifications");
        }
    };

    React.useEffect(() => {
        fetchNotifications();
        // Poll every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const markAllRead = async () => {
        try {
            await api.put('/notifications/read-all');
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error("Failed to mark all read");
        }
    };

    const handleNotificationClick = async (notification) => {
        if (!notification.read) {
            try {
                await api.put(`/notifications/${notification._id}/read`);
                setNotifications(prev => prev.map(n => n._id === notification._id ? { ...n, read: true } : n));
                setUnreadCount(prev => Math.max(0, prev - 1));
            } catch (error) {
                console.error("Failed to mark read");
            }
        }
        if (notification.link) {
            navigate(notification.link);
            setNotificationOpen(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: <FiGrid size={18} /> },
        { path: '/admin/products', label: 'Products', icon: <FiBox size={18} /> },
        { path: '/admin/categories', label: 'Categories', icon: <FiLayers size={18} /> },
        { path: '/admin/orders', label: 'Orders', icon: <FiShoppingCart size={18} /> },
        { path: '/admin/coupons', label: 'Coupons', icon: <FiTag size={18} /> },
        { path: '/admin/reviews', label: 'Reviews', icon: <FiStar size={18} /> },
    ];

    const isActive = (path) => {
        if (path === '/admin' && location.pathname === '/admin') return true;
        if (path !== '/admin' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="flex min-h-screen bg-[#FDFDFD] font-sans selection:bg-black selection:text-white">
            <Toaster position="bottom-left" richColors theme="light" />

            {/* Mobile Sidebar Toggle - Floating */}
            <div className="md:hidden fixed z-50 bottom-6 right-6">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-4 bg-black text-white rounded-full shadow-2xl hover:scale-105 transition-transform"
                >
                    {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed md:sticky top-0 h-screen w-80 bg-white border-r border-gray-100 flex flex-col z-40 transition-transform duration-500 ease-[0.22,1,0.36,1] md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Logo Area */}
                <div className="h-32 flex items-center px-10">
                    <Link to="/admin" className={`text-2xl font-serif font-bold tracking-tighter`}>
                        LUXE<span className="text-accent">.</span>
                    </Link>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-6 space-y-1 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-6">Overview</p>

                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`group relative flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 ${active
                                    ? 'bg-black text-white shadow-lg shadow-black/10'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                                    }`}
                            >
                                <span className={`transition-colors duration-300 ${active ? 'text-accent' : 'text-gray-400 group-hover:text-black'}`}>
                                    {item.icon}
                                </span>
                                <span className={`text-xs font-bold uppercase tracking-[0.15em] ${active ? 'text-white' : ''}`}>
                                    {item.label}
                                </span>

                                {/* Active Indicator Dot */}
                                {active && (
                                    <motion.div
                                        layoutId="activeDot"
                                        className="absolute right-4 w-1.5 h-1.5 rounded-full bg-accent"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile & Actions */}
                <div className="p-8 border-t border-gray-50">
                    <div className="flex items-center gap-4 mb-6 px-2">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold border border-white shadow-sm">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-black">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-gray-400">Admin</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border border-gray-200 rounded-lg hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                        >
                            <FiHome size={14} /> Store
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                            <FiLogOut size={14} /> Log Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 md:pl-0 pt-0 bg-[#FDFDFD]">
                {/* Header Navbar */}
                <header className="h-24 px-8 md:px-12 flex items-center justify-between sticky top-0 z-30 bg-[#FDFDFD]/80 backdrop-blur-md">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-black">
                            {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
                        </h2>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* <div className="hidden md:flex items-center bg-white px-4 py-2.5 rounded-full border border-gray-100 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all">
                            <FiSearch className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none text-sm ml-2 w-48 placeholder-gray-400"
                            />
                        </div> */}
                        <div className="relative">
                            <button
                                onClick={() => setNotificationOpen(!notificationOpen)}
                                className="relative p-2 text-gray-400 hover:text-black transition-colors"
                            >
                                <FiBell size={20} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {notificationOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                                    <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                                        <h3 className="font-bold text-sm">Notifications</h3>
                                        <button onClick={markAllRead} className="text-xs text-accent hover:underline">Mark all read</button>
                                    </div>
                                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                        {notifications.length === 0 ? (
                                            <div className="p-4 text-center text-gray-400 text-xs">No notifications</div>
                                        ) : (
                                            notifications.map((notif) => (
                                                <div
                                                    key={notif._id}
                                                    onClick={() => handleNotificationClick(notif)}
                                                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${!notif.read ? 'bg-blue-50/30' : ''}`}
                                                >
                                                    <div className="flex gap-3">
                                                        <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!notif.read ? 'bg-accent' : 'bg-gray-300'}`}></div>
                                                        <div>
                                                            <p className={`text-xs ${!notif.read ? 'font-bold text-black' : 'text-gray-600'}`}>{notif.title}</p>
                                                            <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{notif.message}</p>
                                                            <p className="text-[10px] text-gray-300 mt-2">{new Date(notif.createdAt).toLocaleTimeString()} · {new Date(notif.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="px-4 md:px-8 lg:px-12 pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Outlet />
                    </motion.div>
                </div>
            </main>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;
