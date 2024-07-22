import React from 'react';
import { FaTimes } from 'react-icons/fa';

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#2D2C29]">Order Details</h2>
          <button onClick={onClose}>
            <FaTimes className="text-[#DEAD6F]" />
          </button>
        </div>
        <div>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>User:</strong> {order.user.name}</p>
          <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <h3 className="text-xl font-bold mt-4">Products</h3>
          <ul className="list-disc pl-5">
            {order.details.map(detail => (
              <li key={detail.product._id}>
                <p><strong>Name:</strong> {detail.product.name}</p>
                <p><strong>Description:</strong> {detail.product.description}</p>
                <p><strong>Price:</strong> ${detail.price}</p>
                <p><strong>Quantity:</strong> {detail.qty}</p>
                <p><strong>Total:</strong> ${detail.total}</p>
                {detail.product.colors && detail.product.colors.length > 0 && (
                  <p><strong>Colors:</strong> {detail.product.colors.join(', ')}</p>
                )}
                {detail.product.sizes && detail.product.sizes.length > 0 && (
                  <p><strong>Sizes:</strong> {detail.product.sizes.join(', ')}</p>
                )}
                <img src={`/uploads/${detail.product.images[0]}`} alt={detail.product.name} className="w-20 h-20"/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
