import { CartItem } from "@/features/cart/types";

export interface OrderFormValues {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  postalCode: string;
}

export interface Order extends OrderFormValues {
  items: CartItem[];
  totalPrice: number;
}
