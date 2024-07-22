import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../../features/front/orderSlice';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import OrderDetailsModal from './OrderDetailsModal';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector(state => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'failed') {
      toast.error(error);
    }
  }, [status, error]);

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(updateOrderStatus({ orderId: id, status }));
      toast.success('Order status updated successfully!');
      dispatch(fetchOrders());
    } catch (error) {
      toast.error('Error updating order status');
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#2D2C29]">Manage Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#DEAD6F] text-[#2D2C29]">
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Total</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Products</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order._id} className="border-b border-[#DEAD6F]">
                  <td className="p-2">{order._id}</td>
                  <td className="p-2">{order.user.name}</td>
                  <td className="p-2">${order.totalAmount}</td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2">
                    {order.details.map(detail => detail.product.name).join(', ')}
                  </td>
                  <td className="p-2 flex items-center space-x-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="p-2 border border-[#DEAD6F] rounded focus:outline-none focus:ring-2 focus:ring-[#DEAD6F]"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button onClick={() => handleViewDetails(order)}>
                      <FaEye className="text-[#DEAD6F]" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-2 text-center">No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default OrderManagement;
