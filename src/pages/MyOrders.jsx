import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'sonner';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders/myorders');
                setOrders(data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load your orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="min-h-screen pt-24 text-center">Loading orders...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-serif font-bold mb-8">My Orders</h1>
            {orders.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 mb-4">You have no orders yet.</p>
                    <Link to="/listing" className="btn-primary inline-block px-8 py-3 uppercase text-xs font-bold tracking-widest">Start Shopping</Link>
                </div>
            ) : (
                <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px]">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Items</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Total</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                                    {/* <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Action</th> */}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map(order => (
                                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-sm text-gray-600">#{order._id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                                            {order.orderItems?.map(i => i.name).join(', ') || 'No items'}
                                        </td>
                                        <td className="px-6 py-4 font-bold">₹{order.totalPrice?.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-full ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {order.isPaid ? 'Paid' : 'Unpaid'}
                                                </span>
                                                <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-full ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {order.isDelivered ? 'Delivered' : 'Processing'}
                                                </span>
                                            </div>
                                        </td>
                                        {/* <td className="px-6 py-4 text-sm">
                                           <button className="text-gray-400 hover:text-black transition-colors text-xs font-bold uppercase tracking-widest">Details</button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
