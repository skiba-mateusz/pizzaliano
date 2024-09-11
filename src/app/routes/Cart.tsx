import React from "react";
import { Head } from "@/components/seo";
import { CartView } from "@/features/cart/components/CartView";

export const CartRoute: React.FC = () => {
  return (
    <>
      <Head
        title="Shopping Cart"
        description="Review items in your shopping cart and proceed to checkout."
      />
      <CartView />
    </>
  );
};
