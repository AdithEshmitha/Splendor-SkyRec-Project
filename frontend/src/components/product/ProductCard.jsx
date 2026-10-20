import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {

    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();

    const addToCart = () => {

        const token = localStorage.getItem("user_token")
        if (!token) {
            return toast.error("Please login to create cart items")
        }

        if (!product || product.stock <= 0) {
            toast.error("This product is out of stock.");
            return;
        }

        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItemIndex = existingCart.findIndex(
            item => item._id === product._id
        );

        if (existingItemIndex > -1) {
            const newQty = existingCart[existingItemIndex].quantity + quantity;

            existingCart[existingItemIndex].quantity = Math.min(
                Number(product.stock),
                newQty
            );
        } else {
            existingCart.push({
                ...product,
                quantity: Math.min(quantity, Number(product.stock))
            });
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));

        toast.success(`${product.name} added to cart!`);

        window.dispatchEvent(new Event("storage"));
    };

    return (
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">

            <div className="relative w-full h-48 sm:h-56 lg:h-60 overflow-hidden">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover object-center w-full h-full transition-all duration-300 hover:scale-105"
                />

                <div className="absolute bottom-4 right-4 flex items-center gap-3 rounded-full border border-white/50 bg-white/90 backdrop-blur-md px-2 py-1.5 shadow-lg">

                    <button
                        type="button"
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 text-lg hover:bg-gray-200 active:scale-90 transition-all duration-200"
                    >
                        −
                    </button>

                    <span className="w-5 text-center text-sm font-semibold text-gray-900 tabular-nums">
                        {quantity}
                    </span>

                    <button
                        type="button"
                        disabled={quantity >= Number(product.stock)}
                        onClick={() => setQuantity(q => Math.min(Number(product.stock), q + 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#02032b] text-white text-lg hover:bg-[#151642] active:scale-90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="px-4 py-4 flex flex-col flex-1">

                <h3 className="text-base sm:text-lg font-semibold text-text line-clamp-1">
                    {product.name}
                </h3>

                <p className="text-xl font-bold text-primary mt-2">
                    Rs. {Number(product.price).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </p>

                <div className="flex items-center justify-between gap-2 mt-3 mb-4">
                    <span className="text-xs sm:text-sm text-text/60">
                        {product.category}
                    </span>

                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${product.stock > 0
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-600'
                        }`}>
                        {product.stock > 0
                            ? `${product.stock} in stock`
                            : 'Out of stock'}
                    </span>
                </div>

                <div className="h-px bg-gray-100 mb-4" />

                <div className="grid grid-cols-2 gap-2 mt-auto">

                    <button
                        onClick={addToCart}
                        disabled={product.stock <= 0}
                        className="min-h-10 px-2 sm:px-3 rounded-lg bg-primary text-white text-xs sm:text-sm font-medium hover:opacity-90 active:scale-95 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Add to Cart
                    </button>

                    <button
                        onClick={() => navigate(`/product/${product.slug}`)}
                        className="min-h-10 px-2 sm:px-3 rounded-lg border border-gray-200 text-text text-xs sm:text-sm font-medium hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all duration-200"
                    >
                        View Details
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductCard;