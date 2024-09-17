import * as yup from "yup";
import supabase from "@/lib/supabaseClient";
import { DeliveryInfo, Order, OrderItem, UserInfo } from "@/types/api";
import { useState } from "react";

export const createOrderInputSchema = yup.object().shape({
  full_name: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, "Invalid name")
    .min(3, "Full name needs to be at least 3 characters long")
    .max(50, "Full name cannot exceed 50 characters"),

  email_address: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  phone_number: yup
    .string()
    .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/, "Invalid phone number")
    .required("Phone number is required"),

  street_address: yup
    .string()
    .required("Street address is required")
    .min(5, "Street address needs to be at least 5 characters long"),

  city: yup
    .string()
    .required("City is required")
    .min(3, "City name needs to be at least 3 characters long"),

  postal_code: yup.string().required("Postal code is required"),
});

export type CreaterOrderInputValues = yup.InferType<
  typeof createOrderInputSchema
>;

export interface CreateOrderInput {
  total_price: number;
  delivery_info: DeliveryInfo;
  user_info: UserInfo;
  items: OrderItem[];
}

const createOrder = async (payload: CreateOrderInput) => {
  let { items, ...restPayload } = payload;
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([restPayload])
    .select()
    .single<Order>();

  if (orderError) {
    throw new Error(`Error creating order: ${orderError.message}`);
  }

  const orderId = order?.id;

  items = items.map((item) => ({ ...item, order_id: orderId }));

  const { error: orderItemsError } = await supabase
    .from("order_items")
    .insert(items);

  if (orderItemsError) {
    throw new Error(`Error creating order items: ${orderItemsError.message}`);
  }

  return order.id;
};

export const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const createOrderMutation = async (payload: CreateOrderInput) => {
    setIsLoading(true);
    setError("");

    try {
      const orderId = await createOrder(payload);
      return orderId;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setIsLoading(false);
      throw err;
    }
  };

  return { createOrder: createOrderMutation, isLoading, error };
};
