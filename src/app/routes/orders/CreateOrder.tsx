import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Message } from "@/components/ui/message";
import { CartList } from "@/features/cart/components/CartList";
import { useCart } from "@/features/cart/contexts/CartContext";
import { CartActionTypes } from "@/features/cart/contexts/CartContext";
import { calculateCartTotals } from "@/features/cart/utils";
import { CreateOrderForm } from "@/features/order/components/CreateOrderForm";
import { Head } from "@/components/seo";

export const CreateOrderRoute: React.FC = () => {
  const {
    state: { items, numItems },
    dispatch,
  } = useCart();
  const navigate = useNavigate();

  const { totalPrice, savings, totalPriceAfterSavings } =
    calculateCartTotals(items);

  return (
    <>
      <Head
        title="Place Your Order"
        description="Choose your food and place an order quickly."
      />
      ;
      <section className="py-8">
        <Container>
          <Heading level="h1">Place Order</Heading>
          <div className="mt-4 grid items-start gap-4 md:gap-8 lg:grid-cols-[3fr_2fr]">
            <section className="p-4 rounded-md shadow-md">
              <Heading className="mb-4" level="h2" variant="plain">
                Delivery infomration
              </Heading>
              {numItems > 0 ? (
                <CreateOrderForm
                  items={items}
                  totalPrice={totalPriceAfterSavings}
                  onSuccess={() => {
                    navigate(`/order/confirmation`);
                    dispatch({ type: CartActionTypes.CLEAR_CART });
                  }}
                />
              ) : (
                <Message variant="info">
                  If you want to place an order, you need to fill your cart{" "}
                  <Link to="/menu" className="text-rose-500">
                    Check menu
                  </Link>
                </Message>
              )}
            </section>
            <section className="p-4 rounded-md shadow-md">
              <Heading className="mb-4" level="h2" variant="plain">
                Order summary
              </Heading>
              <CartList items={items} withQuantityControls={false} />
              <hr className="my-4" />
              {savings !== 0 && (
                <p className="flex">
                  <span className="ml-auto bg-emerald-200 px-2 py-1 rounded-md text-emerald-900 text-sm font-bold">
                    You're saving ${savings.toFixed(2)}
                  </span>
                </p>
              )}
              <p className="flex">
                <span className="text-neutral-700">To pay: </span>
                <span className="ml-auto">
                  {totalPriceAfterSavings !== totalPrice && (
                    <span className="line-through text-neutral-700">
                      ${totalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="ml-2 font-bold text-lg">
                    ${totalPriceAfterSavings.toFixed(2)}
                  </span>
                </span>
              </p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
};
