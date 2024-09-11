import { CartProvider } from "@/features/cart/contexts/CartContext";
import React from "react";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <CartProvider>{children}</CartProvider>;
};
