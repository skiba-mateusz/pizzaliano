export type CategoryType = "pizzas" | "drinks" | "burgers" | "promotions";

export interface Category {
  label: string;
  value: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  image: string;
  categories: CategoryType[];
  onPromotion: boolean;
  originalPrice?: number;
  currentPrice: number;
}

export interface Menu {
  items: MenuItem[];
  categories: Category[];
}
