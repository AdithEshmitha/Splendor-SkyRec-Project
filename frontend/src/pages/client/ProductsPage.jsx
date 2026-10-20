import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductCard from "../../components/product/ProductCard";

const ProductsPage = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");

    const fetchProducts = async () => {
        if (query && query.trim() !== "") {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/get-products/${query}`);
                setProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error("Failed to fetch products. Please try again later.");
            }
        } else {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/get-products`);
                setProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error("Failed to fetch products. Please try again later.");
            }
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [query])


    return (
        <div className='px-4 md:px-10 lg:px-20'>

            <h1 className='text-4xl font-semibold text-text mb-8'>Products</h1>

            <div className='w-full flex justify-between items-center border-t border-b border-text/20 py-5'>
                <input onChange={(e) => { setQuery(e.target.value) }} type="text" placeholder='Search product here' className='w-full md:w-100 h-12 border border-text/50 outline-none rounded-md px-5 text-text tracking-wide' />

                <div className='hidden md:flex bg-[#f0f0f0] w-25 h-12 justify-center items-center rounded px-2'>
                    <select name="" id="" className='w-full h-full outline-none border-none'>
                        <option value="">25</option>
                        <option value="">50</option>
                        <option value="">75</option>
                    </select>
                </div>
            </div>

            <div className="w-full mx-auto mt-10">
                {loading ? (
                    <div className="w-full flex justify-center items-center py-50">
                        <div className="loader">Loading...</div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="w-full text-center py-50 text-text/50">
                        No products available.
                    </div>
                ) : (
                    <div className="w-full pb-4">
                        <div className="grid  gap-4 sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                            {products.map((product) => (
                                <div key={product._id || product.id} className="min-w-0">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default ProductsPage
