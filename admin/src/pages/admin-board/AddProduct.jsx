import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IoCloudUploadOutline } from "react-icons/io5"
import { FaArrowLeft } from "react-icons/fa"
import { toast } from "react-toastify"
import { uploadMedia } from "../../util/mediaUpload"
import axios from 'axios'

const AddProduct = () => {

    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([])
    const [price, setPrice] = useState('')
    const [discountPercentage, setDiscountPercentage] = useState(0)
    const [stock, setStock] = useState('')
    const [isPublished, setIsPublished] = useState(true)

    const navigate = useNavigate()

    const handleImages = async (e) => {
        const files = Array.from(e.target.files)
        setImages(files)

        try {
            const promisesArray = []
            for (let i = 0; i < files.length; i++) {
                const promise = uploadMedia(files[i])
                promisesArray[i] = promise
            }
            const responses = await Promise.all(promisesArray)
            setImages(responses)
            toast.success('Images uploded successfully!')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name || !slug || !category || !description || !price || !stock) {
            toast.error('Please fill all fileds to add product!')
            return
        }

        if (!images || images.length === 0) {
            toast.error("Please upload at least one product image!");
            return;
        }

        const productData = {
            name,
            slug,
            category,
            description,
            images,
            price,
            discountPercentage,
            stock,
            isPublished
        }

        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
        const token = localStorage.getItem('user_token')

        try {
            const response = await axios.post(`${BACKEND_URL}/api/products/add-product`, productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success(response?.data?.message)
            navigate('/products')
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return (
        <div className="w-full">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-text">Add Product</h1>
                    <p className="text-sm text-text/50 mt-1">Create and publish a new product</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/products')}
                        className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-white text-text text-sm font-medium shadow-sm border border-gray-100 hover:bg-gray-50 transition-all duration-200 active:scale-95"
                    >
                        <FaArrowLeft className="text-xs" />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="add-product-form"
                        className="px-4 sm:px-5 py-2.5 rounded-lg bg-[#02032b] text-white text-sm font-medium shadow-lg hover:opacity-90 transition-all duration-200 active:scale-95"
                    >
                        Publish Product
                    </button>
                </div>
            </div>

            <form
                id="add-product-form"
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                    <div className="mb-6">
                        <h2 className="text-base sm:text-lg font-semibold text-text">
                            Product Information
                        </h2>
                        <p className="text-xs sm:text-sm text-text/40 mt-1">
                            Enter the basic details of your product
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-text mb-2">
                                Product Name
                            </label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                placeholder="Product Name"
                                className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none text-sm text-text focus:border-[#02032b] transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text mb-2">Slug</label>
                            <input
                                onChange={(e) => setSlug(e.target.value)}
                                value={slug}
                                type="text"
                                placeholder="product-slug"
                                className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none text-sm text-text focus:border-[#02032b] transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text mb-2">Stock</label>
                            <input
                                onChange={(e) => setStock(e.target.value)}
                                value={stock}
                                type="number"
                                min={0}
                                placeholder="0"
                                className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none text-sm text-text focus:border-[#02032b] transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text mb-2">Price</label>
                            <input
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                type="number"
                                min={0}
                                placeholder="0"
                                className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none text-sm text-text focus:border-[#02032b] transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text mb-2">Discount Percentage</label>
                            <input
                                onChange={(e) => setDiscountPercentage(e.target.value)}
                                value={discountPercentage}
                                type="number"
                                min={0}
                                max={100}
                                placeholder="0"
                                className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none text-sm text-text focus:border-[#02032b] transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text mb-2"> Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full h-11 px-4 rounded-lg border border-gray-200 outline-none text-sm text-text bg-white focus:border-[#02032b] transition-all duration-200"
                            >
                                <option value="">Select Category</option>
                                <option value="Skincare">Skincare</option>
                                <option value="Makeup">Makeup</option>
                                <option value="Haircare">Haircare</option>
                                <option value="Fragrance">Fragrance</option>
                                <option value="Bodycare">Bodycare</option>
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-text mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your product"
                                rows={6}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none text-sm text-text resize-none focus:border-[#02032b] transition-all duration-200"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5">

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-sm font-semibold text-text">Product Status</h2>
                                <p className="text-xs text-text/40 mt-1">Make this product visible</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsPublished(!isPublished)}
                                className={`relative w-11 h-6 rounded-full transition-all duration-300 ${isPublished
                                    ? 'bg-[#02032b]'
                                    : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${isPublished
                                        ? 'left-6'
                                        : 'left-1'
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="mt-4">
                            <span
                                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${isPublished
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-gray-100 text-gray-500'
                                    }`}
                            >
                                {isPublished ? 'Published' : 'Draft'}
                            </span>
                        </div>

                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <div className="mb-4">
                            <h2 className="text-sm font-semibold text-text">Product Images</h2>
                            <p className="text-xs text-text/40 mt-1"> Upload up to 4 product images</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {[0, 1, 2, 3].map((index) => (
                                <label
                                    key={index}
                                    className="relative aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#02032b] hover:bg-gray-50 transition-all duration-200 overflow-hidden"
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple={true}
                                        onChange={handleImages}
                                        className="hidden"
                                    />

                                    {images[index] ? (
                                        <img
                                            src={images[index]}
                                            alt={`Product ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <IoCloudUploadOutline className="text-2xl text-text/30" />

                                            <span className="text-xs text-text/40 mt-2">
                                                Image {index + 1}
                                            </span>
                                        </>
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddProduct