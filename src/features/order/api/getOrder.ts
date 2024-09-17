import supabase from "@/lib/supabaseClient";
import { MenuItem, Order } from "@/types/api";

export const getOrder = async (id: number) => {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .returns<Order>();

  if (orderError) {
    throw new Error(`Error fetching order: ${orderError}`);
  }

  const { data: menuItems, error: menuItemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", order.id)
    .returns<MenuItem[]>();

  if (menuItemsError) {
    throw new Error(`Error fetching items: ${menuItemsError}`);
  }

  order.items = menuItems;

  return order;
};
