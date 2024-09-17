export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface Promotion {
  id: number;
  name: string;
  discount_value: number;
  isActive: boolean;
  createdAt: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
  category_id: number;
  categories: Category;
  promotion_id?: number;
  promotions?: Promotion;
  createdAt: string;
}

export interface DeliveryInfo {
  street_address: string;
  city: string;
  postal_code: string;
}

export interface UserInfo {
  full_name: string;
  email_address: string;
  phone_number: string;
}

export interface OrderItem {
  order_id: number;
  item_id: number;
  quantity: number;
  price_per_item: number;
}

export interface Order {
  id: number;
  total_price: number;
  status: string;
  delivery_info: DeliveryInfo;
  user_info: UserInfo;
  items: MenuItem[];
  created_at: string;
}

export type CategorizedMenuItems = Record<string, MenuItem[]>;

export interface GetMenuItemsParams {
  categorySlug?: string;
  promotions?: boolean;
  isActive: boolean;
}

export interface GetMenuItemsResponse {
  categorizedMenuItems: CategorizedMenuItems;
  count: number;
}
