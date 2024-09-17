import { MenuItem } from "@/types/api";

export interface CartItem extends MenuItem {
  quantity: number;
}

export enum CartActionTypes {
  ADD_CART_ITEM = "ADD_CART_ITEM",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
  UPDATE_CART_ITEM_QUANTITY = "UPDATE_CART_ITEM_QUANTITY",
  CLEAR_CART = "CLEAR_CART",
}

interface AddCartItemAction {
  type: CartActionTypes.ADD_CART_ITEM;
  payload: CartItem;
}

interface UpdateCartItemQuantity {
  type: CartActionTypes.UPDATE_CART_ITEM_QUANTITY;
  payload: { id: number; quantity: number };
}

interface RemoveCartItemAction {
  type: CartActionTypes.REMOVE_CART_ITEM;
  payload: number;
}

interface ClearCart {
  type: CartActionTypes.CLEAR_CART;
}

export type CartActions =
  | AddCartItemAction
  | RemoveCartItemAction
  | UpdateCartItemQuantity
  | ClearCart;
