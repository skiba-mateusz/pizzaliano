export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
}

export interface Promotions {
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
  isAvailable: boolean;
  category_id: number;
  categories: Category;
  promotion_id?: number;
  promotions?: Promotion;
  createdAt: string;
}

export interface Promotion {
  id: number;
  name: string;
  discount_value: number;
  createdAt: string;
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
