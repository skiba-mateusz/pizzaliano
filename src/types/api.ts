export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
}

export interface Promotion {
  id: number;
  name: string;
  discountValue: number;
  isActive: boolean;
  createdAt: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  blurHash: string;
  categoryID: number;
  category: Category;
  promotionID?: number;
  promotion?: Promotion;
  createdAt: string;
}

export interface DeliveryInfo {
  streetAddress: string;
  city: string;
  postalCode: string;
}

export interface UserInfo {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
}

export interface OrderItem {
  orderID: number;
  menuItemID: number;
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: number;
  totalPrice: number;
  status: string;
  deliveryInfo: DeliveryInfo;
  userInfo: UserInfo;
  items: MenuItem[];
  createdAt: string;
}

export interface GetMenuItemsParams {
  categorySlug?: string;
  promotions?: boolean;
}

export type CategorizedMenuItems = Record<string, MenuItem[]>;

export interface GetMenuItemsResponse {
  categorizedMenuItems: CategorizedMenuItems;
  count: number;
}
