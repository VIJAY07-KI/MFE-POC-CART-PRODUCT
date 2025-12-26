import React, { Suspense, useEffect, useState } from "react";

const Products = React.lazy(() => import("Products/Products"));
const Cart = React.lazy(() => import("Cart/Cart"));

type Product = {
  id: number;
  name: string;
  price: number;
};

type CartItem = Product & { qty: number };

const App = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product | number) => {
    setCartItems((prev) => {
      if (typeof product === "number") {
        return prev.map((p) =>
          p.id === product ? { ...p, qty: p.qty + 1 } : p
        );
      }

      const found = prev.find((p) => p.id === product.id);
      return found
        ? prev.map((p) =>
            p.id === product.id ? { ...p, qty: p.qty + 1 } : p
          )
        : [...prev, { ...product, qty: 1 }];
    });
  };

  const removeOne = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: p.qty - 1 } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const removeAll = (id: number) => {
    setCartItems((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🧩 MFE Host App</h1>
      </header>

      <main className="content">
        <Suspense fallback={<p>Loading Products...</p>}>
          <Products onAdd={addToCart} />
        </Suspense>

        <Suspense fallback={<p>Loading Cart...</p>}>
          <Cart
            items={cartItems}
            onAdd={addToCart}
            onRemoveOne={removeOne}
            onRemoveAll={removeAll}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
