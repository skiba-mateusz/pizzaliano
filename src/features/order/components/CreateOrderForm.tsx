import React from "react";
import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  CreateOrderFormValues,
  createOrderFormSchema,
  useCreateOrder,
} from "../api/createOrder";
import { CartItem } from "@/features/cart/contexts/CartContext";
import { isObjectDifferent } from "@/utils/object";

interface CreateOrderFormProps {
  onSuccess: () => void;
  items: CartItem[];
  totalPrice: number;
}

export const CreateOrderForm: React.FC<CreateOrderFormProps> = ({
  onSuccess,
  items,
  totalPrice,
}) => {
  const { createOrder, isLoading } = useCreateOrder();
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
  const methods = useForm<CreateOrderFormValues>({
    resolver: yupResolver(createOrderFormSchema),
    defaultValues: userInfo,
  });

  const onSubmit = async (data: CreateOrderFormValues) => {
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
        onSuccess();
        if (isObjectDifferent(userInfo, data)) {
          setUserInfo(data);
        }
      });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="grid gap-6"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <Input label="Full Name" name="fullName" />
        <div className="grid grid-flow-row gap-6 sm:grid-flow-col">
          <Input label="Email Address" name="emailAddress" type="email" />
          <Input label="Phone Number" name="phoneNumber" mask="999-999-999" />
        </div>
        <div className="grid grid-flow-row gap-4 sm:grid-flow-col md:gap-6">
          <Input label="Street address" name="streetAddress" />
          <Input label="City" name="city" />
          <Input label="Postal Code" name="postalCode" mask="99-999" />
        </div>
        <Button disabled={isLoading}>Place Order</Button>
      </form>
    </FormProvider>
  );
};
