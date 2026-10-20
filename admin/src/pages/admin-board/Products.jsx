import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ProductCard from '../../components/ProductCard'
import { useNavigate } from 'react-router-dom'

const Products = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [editBoxOpen, setEditBoxOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const [editedName, setEditedName] = useState('')
    const [editedSlug, setEditedSlug] = useState('')
    const [editedPrice, setEditedPrice] = useState(0)
    const [editedStock, setEditedStock] = useState(0)
    const [editedDiscountPercentage, setEditedDiscountPercentage] = useState(0)
    const [editedDescription, setEditedDescription] = useState('')
    const [editedIsPublished, setEditedIsPublished] = useState(false)

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const getProducts = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('user_token')
            const response = await axios.get(`${BACKEND_URL}/api/products/get-all-products`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setProducts(response.data.products)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (product) => {
        setSelectedProduct(product)

        setEditedName(product.name)
        setEditedSlug(product.slug)
        setEditedPrice(product.price)
        setEditedStock(product.stock)
        setEditedDiscountPercentage(product.discountPercentage)
        setEditedDescription(product.description)
        setEditedIsPublished(product.isPublished)


        setEditBoxOpen(true)
    }

    const handleEditProduct = async () => {
        try {
            const token = localStorage.getItem('user_token')

            const prodId = selectedProduct.id

            const response = await axios.put(
                `${BACKEND_URL}/api/products/update-product/${prodId}`,
                {
                    name: editedName,
                    slug: editedSlug,
                    price: editedPrice,
                    stock: editedStock,
                    discountPercentage: editedDiscountPercentage,
                    description: editedDescription,
                    isPublished: editedIsPublished
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            toast.success(response?.data?.message)
            setEditBoxOpen(false)
            getProducts()

        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            )
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2.5 md:flex-row md:justify-between md:items-center w-full'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-3xl text-text font-bold'>Products</h2>
                    <h2 className='text-[17px] text-text'>Manage your products</h2>
                </div>
                <div className='flex flex-col gap-2 text-right'>
                    <span className='text-text text-xl font-semibold'>{products.length} products</span>
                    <button
                        onClick={() => { navigate('/products/add-new-product') }}
                        className='w-full md:w-fit md:px-10 h-11 bg-[#02032b] transition-all duration-200 active:scale-95 cursor-pointer text-[15px] text-white tracking-wide rounded'>Add New Product</button>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {loading
                    ? [1, 2, 3, 4].map((item) => (
                        <ProductCard key={item} />
                    ))
                    : products.map((product) => (
                        <ProductCard key={product._id} prod={product} onDelete={getProducts} onEdit={handleEdit} />
                    ))
                }
            </div>

            {editBoxOpen && selectedProduct && (
                <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 px-4 py-6">
                    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white px-5 py-6 sm:px-8 sm:py-8 shadow-2xl">

                        {/* Header */}
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-text">
                                    Edit Product
                                </h2>

                                <p className="text-sm text-text/50 mt-1">
                                    Update your product information
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setEditBoxOpen(false)}
                                className="w-9 h-9 shrink-0 rounded-lg bg-gray-100 text-text/60 hover:bg-gray-200 transition-all duration-200"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="h-px bg-gray-100 mb-6"></div>

                        {/* Form */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* Product Name */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-text mb-2">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    placeholder="Product Name"
                                    className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none text-sm focus:border-[#02032b]"
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">
                                    Slug
                                </label>

                                <input
                                    type="text"
                                    value={editedSlug}
                                    onChange={(e) => setEditedSlug(e.target.value)}
                                    placeholder="Slug"
                                    className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none text-sm focus:border-[#02032b]"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    value={editedPrice}
                                    onChange={(e) => setEditedPrice(e.target.value)}
                                    placeholder="Price"
                                    className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none text-sm focus:border-[#02032b]"
                                />
                            </div>

                            {/* Stock */}
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    value={editedStock}
                                    onChange={(e) => setEditedStock(e.target.value)}
                                    placeholder="Stock"
                                    className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none text-sm focus:border-[#02032b]"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">
                                    Status
                                </label>

                                <select
                                    value={String(editedIsPublished)}
                                    onChange={(e) =>
                                        setEditedIsPublished(e.target.value === "true")
                                    }
                                    className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none text-sm bg-white focus:border-[#02032b]"
                                >
                                    <option value="true">Publish</option>
                                    <option value="false">Draft</option>
                                </select>
                            </div>

                            {/* Discount */}
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">
                                    Discount Percentage
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={editedDiscountPercentage}
                                    onChange={(e) =>
                                        setEditedDiscountPercentage(e.target.value)
                                    }
                                    placeholder="Discount %"
                                    className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none text-sm focus:border-[#02032b]"
                                />
                            </div>

                            {/* Description */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-text mb-2">
                                    Description
                                </label>

                                <textarea
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    rows="5"
                                    placeholder="Describe your product"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none text-sm resize-none focus:border-[#02032b]"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditBoxOpen(false)}
                                    className="px-5 py-2.5 rounded-lg bg-gray-100 text-text text-sm font-medium hover:bg-gray-200 transition-all duration-200"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleEditProduct}
                                    className="px-6 py-2.5 rounded-lg bg-[#02032b] text-white text-sm font-medium hover:opacity-90 transition-all duration-200 active:scale-95"
                                >
                                    Update Product
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products
