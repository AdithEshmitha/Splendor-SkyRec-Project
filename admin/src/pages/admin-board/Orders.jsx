import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LuEye, LuX, LuShoppingBag } from 'react-icons/lu';

const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const getStatusStyle = (status) => {
    switch (status) {
        case 'Delivered': return 'bg-green-50 text-green-700 border-green-100';
        case 'Cancelled': return 'bg-red-50 text-red-700 border-red-100';
        case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-100';
        case 'Processing': return 'bg-purple-50 text-purple-700 border-purple-100';
        default: return 'bg-amber-50 text-amber-700 border-amber-100';
    }
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [updating, setUpdating] = useState(false);

    const token = localStorage.getItem("user_token")
    if (!token) {
        return
    }

    const fetchOrders = async () => {

        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/all-orders`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const openPopup = (order) => {
        setSelectedOrder(order);
        setNewStatus(order.status);
    };

    const handleStatusUpdate = async () => {

        if (!selectedOrder || newStatus === selectedOrder.status) return;

        try {
            setUpdating(true);
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/update-status/${selectedOrder._id}`,
                { status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            if (response.data.success) {
                toast.success('Order status updated');

                setOrders((prev) =>
                    prev.map((o) => (o._id === selectedOrder._id ? { ...o, status: newStatus } : o))
                );
                setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to update status');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return <div className="text-center py-10 font-medium text-text/60">Loading orders...</div>;
    }

    return (
        <div className="w-full bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Manage Orders</h1>
                <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    Total: {orders.length}
                </span>
            </div>

            <div className="w-full overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4 text-center">Items Qty</th>
                            <th className="p-4">Total Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-400">No orders found.</td>
                            </tr>
                        ) : (
                            orders.map((order) => {
                                const totalItemsQty = order.items?.reduce((acc, curr) => acc + curr.quantity, 0) || 0;

                                return (
                                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 font-mono text-xs text-gray-500">
                                            {order._id.toUpperCase()}
                                        </td>
                                        <td className="p-4 font-medium text-gray-800">
                                            {order.shippingDetails?.fullName}
                                        </td>
                                        <td className="p-4 text-center font-semibold">
                                            {totalItemsQty}
                                        </td>
                                        <td className="p-4 font-bold text-primary">
                                            Rs. {order.totalAmount?.toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyle(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => openPopup(order)}
                                                className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all cursor-pointer"
                                            >
                                                <LuEye className="text-lg" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Order Popup */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col p-6 animate-scale-up relative">

                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <LuX className="text-xl" />
                        </button>

                        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                            <LuShoppingBag className="text-primary" />
                            Order Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

                            <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                                <h3 className="font-semibold text-sm text-gray-800 mb-3 uppercase tracking-wider">Shipping Address</h3>
                                <div className="text-sm space-y-2 text-gray-600">
                                    <p><span className="font-medium text-gray-400">Name:</span> {selectedOrder.shippingDetails?.fullName}</p>
                                    <p><span className="font-medium text-gray-400">Phone:</span> {selectedOrder.shippingDetails?.phoneNumber}</p>
                                    <p><span className="font-medium text-gray-400">Address:</span> {selectedOrder.shippingDetails?.address}</p>
                                    <p><span className="font-medium text-gray-400">City:</span> {selectedOrder.shippingDetails?.city}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold text-sm text-gray-800 mb-3 uppercase tracking-wider">Order Summary</h3>
                                    <div className="text-sm space-y-3 text-gray-600">
                                        <p><span className="font-medium text-gray-400">Payment Method:</span> {selectedOrder.paymentMethod}</p>

                                        <div>
                                            <span className="font-medium text-gray-400">Current Status:</span>{' '}
                                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(selectedOrder.status)}`}>
                                                {selectedOrder.status}
                                            </span>
                                        </div>

                                        <div>
                                            <label className="block font-medium text-gray-400 mb-1">Update Status:</label>
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={newStatus}
                                                    onChange={(e) => setNewStatus(e.target.value)}
                                                    disabled={updating}
                                                    className="flex-1 border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-primary cursor-pointer"
                                                >
                                                    {ORDER_STATUSES.map((s) => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                                <button
                                                    onClick={handleStatusUpdate}
                                                    disabled={updating || newStatus === selectedOrder.status}
                                                    className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                                >
                                                    {updating ? 'Saving...' : 'Update'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200/60 pt-3 mt-4 flex justify-between items-center">
                                    <span className="font-bold text-gray-800">Total Paid:</span>
                                    <span className="text-lg font-black text-primary">Rs. {selectedOrder.totalAmount?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-semibold text-sm text-gray-800 mb-3 uppercase tracking-wider">
                                Products ({selectedOrder.items?.length || 0})
                            </h3>
                            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                                {selectedOrder.items?.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between gap-3 border border-gray-100 p-3 rounded-xl bg-white shadow-xs">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <img
                                                src={item.product?.images?.[0]}
                                                alt={item.product?.name || 'Product'}
                                                className="w-12 h-14 object-cover rounded-lg border shrink-0 bg-gray-50"
                                            />
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-gray-800 truncate">
                                                    {item.product?.name || 'Deleted Product'}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Category: {item.product?.category || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            <p className="text-sm font-bold text-primary">
                                                Rs. {item.product?.price?.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;