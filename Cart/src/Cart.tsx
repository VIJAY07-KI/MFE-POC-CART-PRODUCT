import React from "react";
import "./index.css";

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

type CartProps = {
  items: CartItem[];
  onAdd: (id: number) => void;
  onRemoveOne: (id: number) => void;
  onRemoveAll: (id: number) => void;
};

const Cart: React.FC<CartProps> = ({
  items,
  onAdd,
  onRemoveOne,
  onRemoveAll
}) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart">
      <h2 className="cart-title">🛒 Cart</h2>

      {items.length === 0 && (
        <p className="cart-empty">Cart is empty</p>
      )}

      {items.map(item => (
        <div key={item.id} className="cart-item">
          <div className="cart-info">
            <p className="cart-name">{item.name}</p>
            <p className="cart-price">
              ₹{item.price} × {item.qty}
            </p>
          </div>

          <div className="cart-actions">
            <button onClick={() => onRemoveOne(item.id)}>-</button>
            <button onClick={() => onAdd(item.id)}>+</button>
            <button
              className="delete"
              onClick={() => onRemoveAll(item.id)}
            >
              🗑
            </button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div className="cart-total">
          Total: ₹{total}
        </div>
      )}
    </div>
  );
};

export default Cart;
