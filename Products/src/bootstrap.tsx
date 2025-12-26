import React from "react";
import { createRoot } from "react-dom/client";
import Products from "./Products";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

// mock handler for standalone mode
const mockAdd = (product: any) => {
  console.log("Added product:", product);
};

root.render(<Products onAdd={mockAdd} />);
