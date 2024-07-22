import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../features/front/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    dispatch(updateCartItemQuantity({
      productId: item.productId,
      quantity: parseInt(newQuantity, 10),
      color: item.color,
      size: item.size
    }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart({
      productId: item.productId,
      color: item.color,
      size: item.size
    }));
  };

  return (
    <div className="flex justify-between items-center p-2 border-b">
      <div>
        <p className="font-semibold text-sm">{item.name || 'Unnamed Product'}</p>
        <p className="text-sm text-gray-600">${item.price ? item.price.toFixed(2) : '0.00'}</p>
        <div className="flex items-center mt-1">
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            min="1"
            className="w-16 text-center border rounded mr-2"
          />
          <button 
            onClick={handleRemove}
            className="py-1 px-2 border border-red-500 text-red-500 hover:bg-red-100 rounded text-xs"
          >
            Remove
          </button>
        </div>
        {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
        {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
      </div>
    </div>
  );
};

export default CartItem;