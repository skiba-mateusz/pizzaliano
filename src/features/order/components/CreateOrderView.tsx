import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Message } from "@/components/ui/message";
import { CartList } from "@/features/cart/components/CartList";
import { useCart } from "@/features/cart/contexts/CartContext";
import { CreateOrderForm } from "./CreateOrderForm";
import { CreateOrderFormValues, useCreateOrder } from "../api/createOrder";
import { CartActionTypes } from "@/features/cart/contexts/CartContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { isObjectDifferent } from "@/utils/object";
import { calculateCartTotals } from "@/features/cart/utils";

export const CreateOrderView: React.FC = () => {
  const {
    state: { items, numItems },
    dispatch,
  } = useCart();
  const { createOrder, isLoading } = useCreateOrder();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useLocalStorage<CreateOrderFormValues>(
    "userInfo",
    {
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      streetAddress: "",
      city: "",
      postalCode: "",
    }
  );

  const { totalPrice, savings, totalPriceAfterSavings } =
    calculateCartTotals(items);

  const handleSubmit = async (data: CreateOrderFormValues) => {
    const {
      fullName,
      emailAddress,
      phoneNumber,
      streetAddress,
      city,
      postalCode,
    } = data;

    toast
      .promise(
        createOrder({
          totalPrice,
          deliveryInfo: {
            streetAddress,
            city,
            postalCode,
          },
          userInfo: {
            fullName,
            emailAddress,
            phoneNumber,
          },
          items: items.map(({ id, quantity }) => ({
            menuItemID: id,
            quantity,
          })),
        }),
        {
          loading: "Placing order...",
          success: "Order placed successfully",
          error: "There was an error trying to place your order :(",
        }
      )
      .then(() => {
        navigate(`/orders/confirmation`);
        dispatch({ type: CartActionTypes.CLEAR_CART });

        if (isObjectDifferent(userInfo, data)) {
          setUserInfo(data);
        }
      });
  };

  return (
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
                onSubmit={handleSubmit}
                defaultValues={userInfo}
                isLoading={isLoading}
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
  );
};
