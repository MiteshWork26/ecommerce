import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { FiMapPin, FiCreditCard, FiShield, FiCheckCircle, FiX, FiCheck } from 'react-icons/fi';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Google Pay');
    const [showQRModal, setShowQRModal] = useState(false);

    // We need to store the order total because cartTotal will be 0 after clearing the cart
    const [currentOrderTotal, setCurrentOrderTotal] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });
    const [couponCode, setCouponCode] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [availableCoupons, setAvailableCoupons] = useState([]);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const { data } = await api.get('/coupons/available');
                setAvailableCoupons(data);
            } catch (error) {
                console.error("Failed to fetch coupons");
            }
        };
        fetchCoupons();
    }, []);

    const applyCoupon = async () => {
        if (!couponCode.trim()) {
            toast.error('Please enter a coupon code');
            return;
        }
        try {
            const { data } = await api.post('/coupons/validate', {
                code: couponCode,
                purchaseAmount: cartTotal
            });
            setDiscountPercentage(data.discountPercentage);
            // Calculate discount based on current cartTotal
            // Note: If cartTotal changes (it shouldn't in checkout), this might need effect.
            // But cart shouldn't change here.
            const discount = (cartTotal * data.discountPercentage) / 100;
            setDiscountAmount(discount);
            setIsCouponApplied(true);
            toast.success(`Coupon applied! You saved ${data.discountPercentage}%`);
        } catch (error) {
            setDiscountAmount(0);
            setIsCouponApplied(false);
            toast.error(error.response?.data?.message || 'Invalid coupon code');
        }
    };

    const removeCoupon = () => {
        setCouponCode('');
        setDiscountPercentage(0);
        setDiscountAmount(0);
        setIsCouponApplied(false);
        toast.info('Coupon removed');
    };

    useEffect(() => {
        if (cartItems.length === 0 && !showQRModal) {
            navigate('/cart');
        }
    }, [cartItems, navigate, showQRModal]);

    const handleChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Validation for simple fields
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
            toast.error("Please fill in all shipping fields");
            return;
        }

        await processOrder();
    };

    const processOrder = async () => {
        setIsProcessing(true);
        // Capture total before clearing cart
        // Calculate final total with discount
        const finalTotal = cartTotal - discountAmount;
        setCurrentOrderTotal(finalTotal);

        try {
            const order = {
                orderItems: cartItems.map(item => ({
                    ...item,
                    item: item._id,
                })),
                shippingAddress,
                paymentMethod,
                itemsPrice: cartTotal, // Original price
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: finalTotal, // Discounted total
                couponCode: isCouponApplied ? couponCode : '',
                discountAmount,
            };

            await api.post('/orders', order);
            clearCart();

            // If Google Pay, show the QR code modal for payment
            if (paymentMethod === 'Google Pay') {
                setShowQRModal(true);
            } else {
                toast.success('Order placed successfully!', {
                    description: 'We have received your order and will ship it soon.',
                });
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to place order', {
                description: error.response?.data?.message || 'Please try again later.',
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFinish = () => {
        toast.success('Order placed successfully!', {
            description: 'We have received your order and payment.',
        });
        navigate('/');
    };

    const handleManualPaymentConfirmation = () => {
        setPaymentSuccess(true);
        toast.success("Payment confirmed!");
        // Navigate after showing success message
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-12 pb-24 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Checkout</h1>
                    <p className="text-gray-500 uppercase tracking-widest text-xs">Complete your purchase</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Shipping Section */}
                        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
                                <FiMapPin className="text-accent text-xl" />
                                <h2 className="text-lg font-serif font-bold">Shipping Address</h2>
                            </div>

                            <form id="checkout-form" onSubmit={submitHandler} className="space-y-6">
                                <div>
                                    <label className="block text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Street Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder-gray-300"
                                        placeholder="123 Luxury Lane"
                                        value={shippingAddress.address}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder-gray-300"
                                            placeholder="Mumbai"
                                            value={shippingAddress.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Postal Code</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            required
                                            className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder-gray-300"
                                            placeholder="400001"
                                            value={shippingAddress.postalCode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        required
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder-gray-300"
                                        placeholder="India"
                                        value={shippingAddress.country}
                                        onChange={handleChange}
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
                                <FiCreditCard className="text-accent text-xl" />
                                <h2 className="text-lg font-serif font-bold">Payment Method</h2>
                            </div>

                            <div className="space-y-4">
                                <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'Google Pay' ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Google Pay"
                                        checked={paymentMethod === 'Google Pay'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-4 h-4 text-accent focus:ring-accent"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm">Google Pay / UPI</span>
                                        <span className="text-xs text-gray-500">Pay securely with UPI</span>
                                    </div>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1024px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-6 ml-auto" />
                                </label>

                                {/* Disabled PayPal for now as per previous edits, keeping commented out if user wants to re-enable 
                                <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'PayPal' ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="PayPal"
                                        checked={paymentMethod === 'PayPal'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-4 h-4 text-accent focus:ring-accent"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm">PayPal / Card</span>
                                        <span className="text-xs text-gray-500">International payments</span>
                                    </div>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 ml-auto" />
                                </label> */}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 lg:sticky lg:top-32">
                            <h2 className="text-lg font-serif font-bold mb-6 border-b border-gray-100 pb-4">Order Summary</h2>

                            <div className="space-y-4 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex gap-4 items-start">
                                        <div className="w-16 h-20 bg-gray-50 overflow-hidden shrink-0">
                                            <img src={`http://localhost:5000${item.image}`} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="font-serif text-sm font-bold text-gray-900 line-clamp-2">{item.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1">Qty: {item.qty}</p>
                                        </div>
                                        <div className="text-sm font-bold font-serif">
                                            ₹{(item.price * item.qty).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Coupon Input */}
                            <div className="mb-6">
                                <label className="block text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Coupon Code</label>
                                <div className="flex gap-2">
                                    {availableCoupons.length > 0 ? (
                                        <div className="relative flex-1">
                                            <select
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                disabled={isCouponApplied}
                                                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm uppercase font-mono focus:outline-none focus:border-black transition-colors appearance-none bg-white cursor-pointer"
                                            >
                                                <option value="">Select a coupon</option>
                                                {availableCoupons.map(c => (
                                                    <option key={c._id} value={c.code} disabled={cartTotal < c.minPurchaseAmount}>
                                                        {c.code} - {c.discountPercentage}% OFF {c.minPurchaseAmount > 0 ? `(Min ₹${c.minPurchaseAmount})` : ''}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                            disabled={isCouponApplied}
                                            placeholder="Enter code"
                                            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm uppercase font-mono focus:outline-none focus:border-black transition-colors"
                                        />
                                    )}

                                    {isCouponApplied ? (
                                        <button onClick={removeCoupon} type="button" className="px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded-lg border border-red-100 hover:bg-red-100">
                                            Remove
                                        </button>
                                    ) : (
                                        <button onClick={applyCoupon} type="button" className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-black transition-colors">
                                            Apply
                                        </button>
                                    )}
                                </div>
                            </div>


                            <div className="space-y-3 mb-8 border-t border-gray-100 pt-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-bold">₹{cartTotal.toFixed(2)}</span>
                                </div>
                                {isCouponApplied && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Discount ({discountPercentage}%)</span>
                                        <span className="font-bold">-₹{discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Shipping</span>
                                    <span className="text-green-600 text-xs font-bold uppercase tracking-wider">Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-serif font-bold pt-4 border-t border-gray-100">
                                    <span>Total</span>
                                    <span>₹{(cartTotal - discountAmount).toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={isProcessing}
                                className="w-full btn-primary h-14 flex items-center justify-center gap-2 text-sm uppercase font-bold tracking-widest disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        <FiCheckCircle size={18} /> Place Order
                                    </>
                                )}
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs text-center">
                                <FiShield size={14} />
                                <span>Secure SSL Encrypted Transaction</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* QR Code Modal for Google Pay */}
            {showQRModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        {/* Header */}
                        <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="bg-green-100 p-1.5 rounded-full">
                                    <FiCheck className="text-green-600" size={16} />
                                </div>
                                <span className="font-serif font-bold text-gray-900">
                                    {paymentSuccess ? 'Payment Successful!' : 'Order Placed Successfully!'}
                                </span>
                            </div>
                            {!paymentSuccess && (
                                <button onClick={handleFinish} className="text-gray-400 hover:text-black transition-colors">
                                    <FiX size={20} />
                                </button>
                            )}
                        </div>

                        {/* Body */}
                        <div className="p-8 flex flex-col items-center text-center">
                            {paymentSuccess ? (
                                <div className="py-8 animate-in fade-in zoom-in duration-300">
                                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                        <FiCheck size={48} className="text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Thank You!</h3>
                                    <p className="text-gray-500">Your payment has been recorded.</p>
                                    <p className="text-gray-400 text-sm mt-4">Redirecting you to home...</p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-sm text-gray-500 mb-6 w-3/4">Your order has been placed. after payment.</p>

                                    <div className="bg-white p-4 ">
                                        {/* Use a robust QR generator API - URL Encoded to preserve parameters */}
                                        {/* <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=jaygandhi3004@okicici&pn=LuxeThreads&am=${currentOrderTotal.toFixed(2)}&cu=INR`)}`}
                                            alt="UPI QR Code"
                                            className="w-48 h-48 block"
                                        /> */}
                                        {/* <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=darshitkhichadiya00@okicici&pn=LuxeThreads&am=${currentOrderTotal.toFixed(2)}&cu=INR`)}`}
                                            alt="UPI QR Code"
                                            className="w-48 h-48 block"
                                        /> */}
                                    </div>

                                    <div className="text-2xl font-serif font-bold text-gray-900 mb-1">
                                        ₹{currentOrderTotal.toFixed(2)}
                                    </div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">Amount to Pay</p>

                                    <button
                                        onClick={handleManualPaymentConfirmation}
                                        className="w-full btn-primary h-12 flex items-center justify-center gap-2 text-sm uppercase font-bold tracking-widest bg-green-600 hover:bg-green-700 border-transparent"
                                    >
                                        I Have Paid
                                    </button>

                                    <button
                                        onClick={handleFinish}
                                        className="mt-3 w-full text-gray-400 hover:text-gray-600 text-xs uppercase font-bold tracking-widest"
                                    >
                                        Back to Home
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
