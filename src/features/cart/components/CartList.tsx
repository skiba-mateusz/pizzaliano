import React from "react";
import { CartItem } from "./CartItem";
import { Message } from "@/components/ui/message";
import { CartItem as CartItemType } from "../contexts/CartContext";

interface CartListProps {
  items: CartItemType[];
  withQuantityControls?: boolean;
}

export const CartList: React.FC<CartListProps> = ({
  items,
  withQuantityControls = true,
}) => {
  if (items.length === 0) {
    return <Message variant="info">You cart is currently being empty</Message>;
  }

  return (
    <ul className="grid gap-2 lg:gap-4">
      {items.map((item) => (
        <CartItem
          withQuantityControls={withQuantityControls}
          item={item}
          key={item.id}
        />
      ))}
    </ul>
  );
};
