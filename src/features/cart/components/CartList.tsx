import React from "react";
import { CartItem } from "./CartItem";
import { Message } from "@/components/ui/message";
import { CartItem as CartItemType } from "../types";

export const CartList: React.FC<{ items: CartItemType[] }> = ({ items }) => {
  if (items.length === 0) {
    return <Message variant="info">You cart is currently being empty</Message>;
  }

  return (
    <ul className="grid gap-2 lg:gap-4">
      {items.map((item) => (
        <CartItem item={item} />
      ))}
    </ul>
  );
};
