import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuTrash2, LuShoppingBag, LuArrowLeft } from 'react-icons/lu';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(localCart);
    }, []);

    const updateQuantity = (productId, amount, stock) => {
        const updatedCart = cartItems.map(item => {
            if (item._id === productId) {
                const newQty = item.quantity + amount;
                if (newQty > 0 && newQty <= stock) {
                    return { ...item, quantity: newQty };
                }
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item._id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('storage')); // Navbar එක update කිරීමට
    };

    const getDiscountedPrice = (item) => {
        return Number(item.price) - (Number(item.price) * (Number(item.discountPercentage || 0) / 100));
    };

    const totalCartPrice = cartItems.reduce((total, item) => total + (getDiscountedPrice(item) * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4 px-4">
                <h2 className="text-xl font-semibold text-text">Your cart is empty!</h2>
                <button onClick={() => navigate('/products')} className="bg-primary text-white px-6 py-2 rounded-full text-sm">Shop Now</button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-text mb-8">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 flex flex-col gap-4">
                    {cartItems.map((item) => (
                        <div key={item._id} className="bg-white border border-text/10 rounded-2xl p-5 shadow-sm flex justify-between items-center">
                            <div className="flex gap-4 items-center">
                                <img src={item.images?.[0]} alt={item.name} className="w-20 h-24 object-cover rounded-xl border" />
                                <div>
                                    <h3 className="font-semibold text-text text-base sm:text-lg">{item.name}</h3>
                                    <p className="font-bold text-primary mt-2">Rs. {getDiscountedPrice(item).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1">
                                    <button onClick={() => updateQuantity(item._id, -1, item.stock)} className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 font-bold">-</button>
                                    <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item._id, 1, item.stock)} className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-950 text-white font-bold">+</button>
                                </div>
                                <button onClick={() => removeFromCart(item._id)} className="text-red-500 p-2 hover:bg-red-50 rounded-xl"><LuTrash2 className="text-xl" /></button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 border border-text/10 rounded-2xl p-6 h-fit">
                    <h3 className="font-semibold text-lg mb-4 text-text">Order Summary</h3>
                    <div className="flex justify-between font-bold text-lg text-text border-b border-text/10 pb-4">
                        <span>Total Amount</span>
                        <span className="text-primary">Rs. {totalCartPrice.toLocaleString()}</span>
                    </div>

                    <button
                        onClick={() => navigate('/checkout', { state: { items: cartItems, isFromCart: true } })}
                        className="w-full mt-6 py-3 bg-primary text-white font-medium rounded-xl flex items-center justify-center gap-2"
                    >
                        <LuShoppingBag /> Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
