import axios from 'axios';
import Title from "../../components/common/Title";
import skincare from "../../assets/categories/skincare.jpg";
import makeup from "../../assets/categories/makeup.webp";
import hairCare from "../../assets/categories/hari care.jpg";
import bodyCare from "../../assets/categories/body care.jpg";
import fragrance from "../../assets/categories/fragrance.jpg";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductCard from '../../components/product/ProductCard';

const HeroSec = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const reviews = [
        {
            name: "Jhone Smith",
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis perferendis dolorem earum veritatis doloremque modi ab aliquam eaque labore voluptatum aperiam fuga expedita magnam sint autem iure, sunt facere laboriosam!",
            date: "2026 - 10 - 21"
        },
        {
            name: "Jhone Smith",
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis perferendis dolorem earum veritatis doloremque modi ab aliquam eaque labore voluptatum aperiam fuga expedita magnam sint autem iure, sunt facere laboriosam!",
            date: "2026 - 10 - 21"
        }, {
            name: "Jhone Smith",
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis perferendis dolorem earum veritatis doloremque modi ab aliquam eaque labore voluptatum aperiam fuga expedita magnam sint autem iure, sunt facere laboriosam!",
            date: "2026 - 10 - 21"
        },
        {
            name: "Jhone Smith",
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis perferendis dolorem earum veritatis doloremque modi ab aliquam eaque labore voluptatum aperiam fuga expedita magnam sint autem iure, sunt facere laboriosam!",
            date: "2026 - 10 - 21"
        },
        {
            name: "Jhone Smith",
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis perferendis dolorem earum veritatis doloremque modi ab aliquam eaque labore voluptatum aperiam fuga expedita magnam sint autem iure, sunt facere laboriosam!",
            date: "2026 - 10 - 21"
        }
    ]

    const fetchProdcuts = async () => {

        try {
            setLoading(true);

            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/get-products`)
            setProducts(response.data.products);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Failed to fetch products. Please try again later.");
        }

    }

    useEffect(() => {
        fetchProdcuts();
    }, [])

    const latestProducts = products.slice(0, 4);

    const categories = [
        { name: "Skin Care", img: skincare },
        { name: "Makeup", img: makeup },
        { name: "Hair Care", img: hairCare },
        { name: "Body Care", img: bodyCare },
        { name: "Fragrance", img: fragrance }
    ];

    return (
        <>
            <section className="w-full py-8 sm:py-12">

                <Title title="Top Categories" />

                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-8">

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-8 sm:gap-x-8 lg:gap-x-10">

                        {categories.map((category) => (
                            <div
                                key={category.name}
                                className="group flex flex-col items-center text-center">

                                <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full p-1 border border-gray-200 group-hover:border-primary transition-all duration-300">

                                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">

                                        <img
                                            src={category.img}
                                            alt={category.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out" />

                                    </div>
                                </div>

                                <h3 className="mt-4 text-sm sm:text-base font-medium text-text tracking-wide group-hover:text-primary transition-colors duration-300">
                                    {category.name}
                                </h3>

                            </div>
                        ))}

                    </div>

                </div>

            </section>

            <section className="w-full pb-10">

                <Title title="New Arrivals" />

                <div className="w-full mx-auto px-4 sm:px-6 lg:px-20">
                    {loading ? (
                        <div className="w-full flex justify-center items-center py-8">
                            <div className="loader">Loading...</div>
                        </div>
                    ) : latestProducts.length === 0 ? (
                        <div className="w-full text-center py-8 text-text/50">
                            No products available.
                        </div>
                    ) : (
                        <div className="w-full overflow-x-auto no-scrollbar pb-4 sm:overflow-x-visible">
                            <div className="grid grid-flow-col auto-cols-[85%] gap-4 sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                                {latestProducts.map((product) => (
                                    <div key={product._id || product.id} className="min-w-0">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </section>

            <section className="w-full pb-10">

                <Title title="Top Reviews" />

                <div className='w-full py-5 grid grid-cols-1  md:grid-cols-3 gap-7 px-4 md:px-8 lg:px-12 xl:px-24'>

                    {
                        reviews.map((rev, index) => {
                            return (
                                <div
                                    className='w-full bg-[#f0f0f0] px-5 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-102'
                                    key={index}>
                                    <div className='flex flex-col items-center gap-4'>
                                        <div className='w-10 h-10 bg-primary rounded-full text-white text-xl flex justify-center items-center'>{rev?.name.charAt().toUpperCase()}</div>
                                        <div className='flex flex-col'>
                                            <h1 className='text-[17px] text-text font-semibold'>{rev?.name}</h1>
                                            <span className='text-text/50 text-xs'>Verified Customer</span>
                                        </div>
                                        <p className='text-text/80 text-[15px] text-justify'>{rev?.review}</p>
                                        <span className='w-full h-px bg-text/20'></span>
                                        <p className='text-text/80'>{rev?.date}</p>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>

            </section >
        </>
    );
};

export default HeroSec;