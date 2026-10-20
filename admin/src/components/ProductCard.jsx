import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { toast } from 'react-toastify'
import axios from 'axios'

const ProductCard = ({ prod, onDelete, onEdit }) => {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const deleteProduct = async () => {
        try {
            const token = localStorage.getItem('user_token')
            const prodId = prod.id
            const response = await axios.delete(`${BACKEND_URL}/api/products/delete-product/${prodId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success(response?.data?.message)
            onDelete()
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return (
        <>
            {!prod ? (
                <div className="flex flex-col w-full bg-white rounded-xl p-4 animate-pulse">
                    <div className="w-full h-2 bg-[#f0f0f0] rounded"></div>

                    <div className="w-full h-32 bg-[#f0f0f0] rounded-lg mt-4"></div>

                    <span className="w-3/4 h-4 bg-[#f0f0f0] rounded mt-4"></span>

                    <span className="w-1/2 h-4 bg-[#f0f0f0] rounded mt-2"></span>
                </div>
            ) : (
                <div className='flex flex-col gap-3 bg-white p-4 rounded-xl'>
                    <div className='flex items-center gap-5'>
                        <div className='w-12 h-12 overflow-hidden rounded'>
                            <img className='object-center object-cover' src={prod.images[0]} alt={prod.name} />
                        </div>
                        <span className='w-px h-14 bg-black/5 rounded-full'></span>
                        <h2 className='text-text md:text-[16px] tracking-wide text-sm'>{prod.name}</h2>
                    </div>
                    <hr className='bg-gray-400 text-gray-200' />
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-text text-[15px] font-bold md:text-[17px]'>{import.meta.env.VITE_CURRENCY} {Number(prod.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                            <h2 className={`${prod.stock < 10 ? 'text-red-700 bg-red-200' : 'text-green-700 bg-green-200'} text-xs py-1 px-2 rounded-full`}>{prod.stock} in stock</h2>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className="flex items-center gap-1 text-[15px] tracking-wide text-text/60">
                                <span className="text-3xl leading-none">·</span>
                                <span>{prod.category} | {prod.isPublished ? 'Published' : 'Draft'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        onEdit(prod)
                                    }}
                                    className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200 transition-all duration-200">
                                    <FaRegEdit className="text-[15px]" />
                                </button>

                                <button
                                    onClick={() => {
                                        deleteProduct()
                                    }}
                                    className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-all duration-200">
                                    <RiDeleteBin6Line className="text-[16px]" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductCard
