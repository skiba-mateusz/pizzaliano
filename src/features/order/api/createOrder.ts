import * as yup from "yup";
import supabase from "@/lib/supabaseClient";
import { DeliveryInfo, Order, OrderItem, UserInfo } from "@/types/api";
import { useState } from "react";

export const createOrderFormSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, "Invalid name")
    .min(3, "Full name needs to be at least 3 characters long")
    .max(50, "Full name cannot exceed 50 characters"),

  emailAddress: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  phoneNumber: yup
    .string()
    .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/, "Invalid phone number")
    .required("Phone number is required"),

  streetAddress: yup
    .string()
    .required("Street address is required")
    .min(5, "Street address needs to be at least 5 characters long"),

  city: yup
    .string()
    .required("City is required")
    .min(3, "City name needs to be at least 3 characters long"),

  postalCode: yup.string().required("Postal code is required"),
});

export type CreateOrderFormValues = yup.InferType<typeof createOrderFormSchema>;

export type CreateOrderItemPayload = Omit<
  OrderItem,
  "id" | "orderID" | "menuItem" | "createdAt"
>;

export interface CreateOrderPayload {
  totalPrice: number;
  deliveryInfo: DeliveryInfo;
  userInfo: UserInfo;
  items: CreateOrderItemPayload[];
}

const createOrder = async (payload: CreateOrderPayload) => {
  let { items, ...orderDetails } = payload;
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert(orderDetails)
    .select()
    .single<Order>();

  if (orderError) {
    console.error(orderError);
    throw new Error("Order could not be created");
  }

  const orderID = order.id;

  items = items.map((item) => ({ ...item, orderID }));

  const { error: orderItemsError } = await supabase
    .from("order_items")
    .insert(items);

  if (orderItemsError) {
    console.error(orderItemsError);
    throw new Error("Order could not be created");
  }

  return order.id;
};

export const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const createOrderMutation = async (payload: CreateOrderPayload) => {
    try {
      setIsLoading(true);
      setError("");
      const orderId = await createOrder(payload);
      return orderId;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder: createOrderMutation, isLoading, error };
};
