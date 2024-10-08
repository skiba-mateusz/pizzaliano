import React from "react";
import { Head } from "@/components/seo";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { CartList } from "@/features/cart/components/CartList";
import { useCart } from "@/features/cart/contexts/CartContext";
import { calculateCartTotals } from "@/features/cart/utils";
import { Button } from "@/components/ui/button";

export const CartRoute: React.FC = () => {
  const {
    state: { items, numItems },
  } = useCart();

  const { totalPriceAfterSavings } = calculateCartTotals(items);

  return (
    <>
      <Head
        title="Shopping Cart"
        description="Review items in your shopping cart and proceed to checkout."
      />
      <section className="py-8">
        <Container>
          <Heading level="h1">Shopping Cart</Heading>
          <div className="mt-4 grid items-start gap-4 md:grid-cols-[2fr_1fr] md:gap-8">
            <section className="p-4 flex-1 rounded-md shadow-md ">
              <Heading level="h2" variant="plain" className="mb-4">
                Cart items
              </Heading>
              <CartList items={items} />
            </section>
            <section className="p-4 flex flex-col gap-2 rounded-md shadow-md lg:w-[24rem]">
              <Heading className="text-center" level="h2" variant="plain">
                Cart Summary
              </Heading>
              <div className="text-neutral-700" aria-live="polite">
                <p className="flex">
                  Total items:{" "}
                  <span className="ml-auto font-bold text-lg">{numItems}</span>
                </p>
                <p className="flex">
                  Total price:{" "}
                  <span className="ml-auto font-bold text-lg">
                    ${totalPriceAfterSavings.toFixed(2)}
                  </span>
                </p>
              </div>
              <nav className="mt-auto grid gap-2" aria-label="Cart actions">
                <Button to="/order/create">Place Order</Button>
                <Button to="/menu" variant="outlined">
                  Continue Shopping
                </Button>
              </nav>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
};
