import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuArrowLeft, LuCreditCard } from "react-icons/lu";

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { product, quantity: initialQuantity, items, isFromCart } = location.state || {};

    const [checkoutItems, setCheckoutItems] = useState([]);

    useEffect(() => {
        if (isFromCart && items) {
            setCheckoutItems(items);
        } else if (product) {
            setCheckoutItems([{ ...product, quantity: initialQuantity || 1 }]);
        }
    }, [product, items, isFromCart, initialQuantity]);

    if (checkoutItems.length === 0) {
        return (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
                <p className="text-text/60">No product selected for checkout.</p>
                <button onClick={() => navigate('/')} className="bg-primary text-white px-4 py-2 rounded-lg">Go Home</button>
            </div>
        );
    }

    const getDiscountedPrice = (item) => {
        return Number(item.price) - (Number(item.price) * (Number(item.discountPercentage || 0) / 100));
    };

    const totalPrice = checkoutItems.reduce((total, item) => total + (getDiscountedPrice(item) * item.quantity), 0);

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-text/60 hover:text-text mb-6">
                <LuArrowLeft /> Back
            </button>

            <h1 className="text-2xl font-bold text-text mb-8">Checkout Summary</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-2 flex flex-col gap-4">
                    {checkoutItems.map((item) => {
                        const discountedPrice = getDiscountedPrice(item);
                        return (
                            <div key={item._id} className="bg-white border border-text/10 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-5">
                                <img src={item.images?.[0]} alt={item.name} className="w-28 h-32 object-cover rounded-xl border border-text/10" />

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg text-text">{item.name}</h3>
                                        <p className="text-sm text-text/50 mt-1">{item.category}</p>
                                        <p className="font-bold text-primary mt-2">Rs. {discountedPrice.toLocaleString()}</p>
                                    </div>

                                    <div className="flex items-center gap-3 mt-4">
                                        <span className="text-sm font-medium text-text/70">Quantity: <b>{item.quantity}</b></span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-gray-50 border border-text/10 rounded-2xl p-6 h-fit">
                    <h3 className="font-semibold text-lg mb-4 text-text">Order Total</h3>
                    <div className="flex flex-col gap-3 text-sm text-text/70 border-b border-text/10 pb-4">
                        <div className="flex justify-between">
                            <span>Total Items</span>
                            <span>{checkoutItems.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
                        </div>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-text mt-4">
                        <span>Total Amount</span>
                        <span className="text-primary">Rs. {totalPrice.toLocaleString()}</span>
                    </div>

                    <button onClick={() => {
                        navigate('/payment', {
                            state: {
                                items: checkoutItems,
                                totalPrice: totalPrice
                            }
                        })
                    }} className="w-full mt-6 py-3 bg-primary text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer">
                        <LuCreditCard /> Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
