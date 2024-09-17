import React from "react";
import { Head } from "@/components/seo";
import { CreateOrderView } from "@/features/order/components/CreateOrderView";

export const CreateOrderRoute: React.FC = () => {
  return (
    <>
      <Head
        title="Place Your Order"
        description="Choose your food and place an order quickly."
      />
      <CreateOrderView />
    </>
  );
};
