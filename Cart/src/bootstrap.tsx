import React from "react";
import { createRoot } from "react-dom/client";
import Cart from "./Cart";
import "./index.css";

const mockItems = [
  { id: 1, name: "Laptop", price: 60000, qty: 1 },
  { id: 2, name: "Mobile", price: 30000, qty: 2 },
  { id: 3, name: "Tablet", price: 20000, qty: 1 }
];

const root = createRoot(document.getElementById("root")!);

root.render(
  <Cart
    items={mockItems}
    onAdd={() => {}}
    onRemoveOne={() => {}}
    onRemoveAll={() => {}}
  />
);
