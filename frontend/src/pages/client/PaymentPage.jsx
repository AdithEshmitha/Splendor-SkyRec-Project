import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LuArrowLeft, LuCheck } from "react-icons/lu";

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { product, quantity, items, totalPrice: passedTotalPrice } = location.state || {};

    const [orderItems, setOrderItems] = useState([]);
    const [finalTotalPrice, setFinalTotalPrice] = useState(0);

    const [shippingDetails, setShippingDetails] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        city: ''
    });
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("user_token");

    const checkLogin = () => {
        if (!token) {
            toast.error("Please login to place order");
            navigate('/sign-in');
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        if (items) {
            setOrderItems(items);
            setFinalTotalPrice(passedTotalPrice || 0);
        } else if (product) {
            const discountedPrice = Number(product.price) - (Number(product.price) * (Number(product.discountPercentage || 0) / 100));
            const total = discountedPrice * (quantity || 1);

            setOrderItems([{
                _id: product._id,
                product: product._id,
                name: product.name,
                price: product.price,
                discountPercentage: product.discountPercentage,
                images: product.images,
                quantity: quantity || 1
            }]);
            setFinalTotalPrice(total);
        }
    }, [product, quantity, items, passedTotalPrice]);

    if (orderItems.length === 0) {
        return (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
                <p className="text-text/60">No order data found.</p>
                <button onClick={() => navigate('/')} className="bg-primary text-white px-4 py-2 rounded-lg">Go Home</button>
            </div>
        );
    }

    const getDiscountedPrice = (item) => {
        return Number(item.price) - (Number(item.price) * (Number(item.discountPercentage || 0) / 100));
    };

    const handleChange = (e) => {
        setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        if (e) e.preventDefault();

        if (!shippingDetails.fullName || !shippingDetails.phoneNumber || !shippingDetails.address || !shippingDetails.city) {
            return toast.error("Please fill in all shipping details.");
        }

        try {
            setLoading(true);

            const orderData = {
                items: orderItems.map(item => ({
                    product: item._id,
                    quantity: item.quantity,
                    price: getDiscountedPrice(item)
                })),
                totalAmount: finalTotalPrice,
                paymentMethod: 'COD',
                shippingDetails: shippingDetails
            };

            console.log("Submitting Order Data:", orderData);

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/place-order`,
                orderData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success("Order placed successfully!");

                localStorage.removeItem('cart');
                window.dispatchEvent(new Event('storage'));

                navigate('/', { replace: true });
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to place order. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-text/60 hover:text-text mb-6">
                <LuArrowLeft /> Back to Summary
            </button>

            <h1 className="text-2xl font-bold text-text mb-8">Shipping & Payment</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                <form onSubmit={handlePlaceOrder} className="md:col-span-2 bg-white border border-text/10 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                    <h3 className="font-semibold text-lg text-text mb-2">Shipping Details</h3>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-text/70">Full Name</label>
                        <input type="text" name="fullName" value={shippingDetails.fullName} onChange={handleChange} required className="w-full p-3 border border-text/20 rounded-xl focus:outline-primary" placeholder="John Doe" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-text/70">Phone Number</label>
                        <input type="tel" name="phoneNumber" value={shippingDetails.phoneNumber} onChange={handleChange} required className="w-full p-3 border border-text/20 rounded-xl focus:outline-primary" placeholder="0771234567" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-text/70">Delivery Address</label>
                        <input type="text" name="address" value={shippingDetails.address} onChange={handleChange} required className="w-full p-3 border border-text/20 rounded-xl focus:outline-primary" placeholder="123, Main Street" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-text/70">City</label>
                        <input type="text" name="city" value={shippingDetails.city} onChange={handleChange} required className="w-full p-3 border border-text/20 rounded-xl focus:outline-primary" placeholder="Colombo" />
                    </div>

                    <div className="mt-4">
                        <h3 className="font-semibold text-base text-text mb-3">Payment Method</h3>
                        <div className="flex items-center justify-between p-4 bg-green-50/50 border border-green-200 rounded-xl text-green-800">
                            <div className="flex items-center gap-3">
                                <LuCheck className="text-xl text-green-600" />
                                <div>
                                    <p className="font-semibold text-sm">Cash on Delivery (COD)</p>
                                    <p className="text-xs text-green-700/80">Pay with cash upon delivery.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="bg-gray-50 border border-text/10 rounded-2xl p-6 h-fit flex flex-col gap-4">
                    <h3 className="font-semibold text-lg text-text">Order Summary</h3>

                    <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1 border-b border-text/10 pb-4 no-scrollbar">
                        {orderItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 bg-white p-2 border border-text/5 rounded-xl shadow-xs">
                                <img src={item.images?.[0]} alt={item.name} className="w-12 h-14 object-cover rounded-lg border shrink-0" />
                                <div className="overflow-hidden flex-1">
                                    <h4 className="font-medium text-xs text-text truncate">{item.name}</h4>
                                    <p className="text-[11px] text-text/50 mt-0.5">Qty: {item.quantity}</p>
                                    <p className="font-bold text-xs text-primary mt-0.5">Rs. {getDiscountedPrice(item).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between font-bold text-lg text-text border-b border-text/10 pb-4">
                        <span>Total Amount</span>
                        <span className="text-primary">Rs. {finalTotalPrice.toLocaleString()}</span>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="w-full py-3.5 bg-rose-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-rose-600 disabled:opacity-50 transition-all cursor-pointer shadow-md"
                    >
                        {loading ? "Placing Order..." : "Place Order (COD)"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
