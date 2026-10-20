import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { LuShoppingBag, LuShoppingCart } from "react-icons/lu";

const ProductDetailsPage = () => {

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [quantity, setQuantity] = useState(1)

    const { slug } = useParams()
    const navigate = useNavigate()

    const handleAddToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItemIndex = existingCart.findIndex(item => item._id === product._id);

        if (existingItemIndex > -1) {
            const newQty = existingCart[existingItemIndex].quantity + quantity;
            existingCart[existingItemIndex].quantity = Math.min(product.stock, newQty);
        } else {
            existingCart.push({ ...product, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));
        toast.success(`${product?.name} added to cart!`);

        window.dispatchEvent(new Event('storage'));
    };


    const fetchProductDetails = async () => {
        try {
            setLoading(true)
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/get-product/${slug}`
            )
            setProduct(response.data?.product)
        } catch (error) {
            toast.error('Error fetching product details')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProductDetails()
    }, [slug])

    const calcDiscountedPrice = (price, discount) => {
        return Number(price) - (
            Number(price) * (Number(discount) / 100)
        )
    }

    return (
        <div className='w-full min-h-[80vh] flex flex-col px-4 sm:px-6 md:px-10 lg:px-18 py-4 sm:py-6'>

            <div className='flex flex-wrap items-center gap-2 p-2 sm:p-4 text-text/50 text-sm min-w-0'>
                <p
                    onClick={() => { navigate('/') }}
                    className='transition-all duration-300 hover:text-text cursor-pointer shrink-0'>
                    Home /
                </p>
                <p
                    onClick={() => { navigate('/products') }}
                    className='transition-all duration-300 hover:text-text cursor-pointer shrink-0'>
                    Products /
                </p>
                <p className='text-text wrap-break-words min-w-0'>
                    {product?.name}
                </p>
            </div>

            <div className='w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-8 lg:gap-12 mt-6 md:mt-0'>

                <div className='w-full md:w-1/2 min-w-0 flex flex-col items-center justify-center gap-4'>

                    <div className='w-full max-w-100 sm:max-w-115 lg:max-w-125 aspect-5/6 overflow-hidden rounded-lg border border-text/20'>
                        <img
                            src={selectedImage || product?.images?.[0]}
                            alt={product?.name}
                            className='w-full h-full object-cover rounded-lg hover:scale-105 transition-all duration-300' />
                    </div>

                    <div className='w-full max-w-100 sm:max-w-115 lg:max-w-125 flex items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-1 px-1'>
                        {product?.images?.map((image, index) => {
                            return (
                                <img
                                    src={image}
                                    onClick={() => { setSelectedImage(image) }}
                                    alt={product.name}
                                    key={index}
                                    className={`w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 object-cover shrink-0 rounded-lg transition-all duration-100 border-2 cursor-pointer ${selectedImage === image
                                        ? 'border-primary'
                                        : 'border-text/20'
                                        }`} />
                            )
                        })}
                    </div>

                </div>

                <div className="w-full md:w-1/2 min-w-0 flex flex-col items-start justify-center gap-4 sm:gap-5">

                    <div className="flex items-center gap-2 text-sm text-text/55">
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                        <span>{product?.category}</span>
                    </div>

                    <span className="w-full sm:w-3/4 h-px bg-linear-to-r from-text/20 to-transparent rounded-full"></span>

                    <div className="w-full flex flex-col items-start gap-3">

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-text leading-snug tracking-tight wrap-break-words">
                            {product?.name}
                        </h1>

                        <div className="flex flex-wrap items-end gap-x-3 gap-y-2">

                            <p className="font-bold text-2xl sm:text-3xl text-primary tracking-tight">
                                Rs. {Number(calcDiscountedPrice(
                                    product?.price,
                                    product?.discountPercentage
                                )).toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </p>

                            {Number(product?.discountPercentage) > 0 && (
                                <div className="flex flex-wrap items-center gap-2 pb-1">

                                    <p className="text-sm text-text/45 line-through">
                                        Rs. {Number(product?.price).toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </p>

                                    <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">
                                        {product?.discountPercentage}% OFF
                                    </span>

                                </div>
                            )}

                        </div>

                        <div className="w-full sm:w-3/4 md:w-full lg:w-3/4 mt-1">
                            <p className="text-sm sm:text-[15px] text-text/65 leading-7 tracking-wide">
                                {product?.description}
                            </p>
                        </div>

                        <span
                            className={`inline-flex items-center gap-2 text-sm font-medium px-3.5 py-1.5 rounded-full border ${product?.stock > 10
                                ? 'bg-green-50 text-green-700 border-green-100'
                                : product?.stock > 0
                                    ? 'bg-amber-50 text-amber-700 border-amber-100'
                                    : 'bg-red-50 text-red-600 border-red-100'
                                }`}>
                            <span
                                className={`w-1.5 h-1.5 rounded-full shrink-0 ${product?.stock > 10
                                    ? 'bg-green-500'
                                    : product?.stock > 0
                                        ? 'bg-amber-500'
                                        : 'bg-red-500'
                                    }`}></span>

                            {product?.stock > 0
                                ? product.stock <= 10
                                    ? `Only ${product.stock} left in stock`
                                    : `${product.stock} in stock`
                                : 'Out of stock'}
                        </span>

                    </div>

                    <span className="w-full sm:w-3/4 h-px bg-linear-to-r from-text/20 to-transparent rounded-full my-1"></span>

                    <div className="flex flex-col gap-2">

                        <span className="text-xs font-semibold text-text/60 uppercase tracking-widest">
                            Quantity
                        </span>

                        <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white p-1.5 shadow-sm">

                            <button
                                type="button"
                                disabled={quantity <= 1 || product?.stock <= 0}
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 text-lg hover:bg-gray-200 active:scale-90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
                                −
                            </button>

                            <span className="min-w-6 text-center text-sm font-semibold text-text tabular-nums">
                                {quantity}
                            </span>

                            <button
                                type="button"
                                disabled={product?.stock <= 0 || quantity >= product?.stock}
                                onClick={() => setQuantity(q => Math.min(Number(product?.stock), q + 1))}
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#02032b] text-white text-lg hover:bg-[#151642] active:scale-90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
                                +
                            </button>

                        </div>

                    </div>

                    <span className="w-full sm:w-3/4 h-px bg-linear-to-r from-text/20 to-transparent rounded-full my-1"></span>

                    <div className="w-full sm:w-3/4 md:w-full lg:w-3/4 flex flex-col sm:flex-row items-center gap-3 h-30 md:h-10">

                        <button
                            onClick={handleAddToCart}
                            type="button"
                            disabled={product?.stock <= 0}
                            className="w-full min-w-0 flex-1 flex justify-center items-center transition-all duration-300 h-12 bg-[#f0f0f0] hover:bg-gray-200 rounded-full text-text gap-2.5 cursor-pointer active:scale-[0.97] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                            <LuShoppingCart className="text-lg shrink-0" />
                            Add to Cart
                        </button>

                        <button
                            onClick={() => {
                                navigate('/checkout', {
                                    state: {
                                        product: product,
                                        quantity: quantity
                                    }
                                });
                            }}
                            type="button"
                            disabled={product?.stock <= 0}
                            className="w-full min-w-0 flex-1 flex justify-center items-center transition-all duration-300 h-12 bg-primary hover:opacity-90 rounded-full text-white gap-2.5 cursor-pointer active:scale-[0.97] text-sm font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                            <LuShoppingBag className="text-lg shrink-0" />
                            Buy Now
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ProductDetailsPage