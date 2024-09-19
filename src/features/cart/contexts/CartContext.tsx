import React, { createContext, useContext, useEffect, useReducer } from "react";
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

interface CartState {
  items: CartItem[];
  numItems: number;
}

const initialState: CartState = {
  items: [],
  numItems: 0,
};

const cartReducer = (state: CartState, action: CartActions) => {
  switch (action.type) {
    case CartActionTypes.ADD_CART_ITEM: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          numItems: state.numItems + 1,
          items: state.items.map((item) =>
            item.id === existingItem?.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        numItems: state.numItems + 1,
        items: [...state.items, action.payload],
      };
    }
    case CartActionTypes.UPDATE_CART_ITEM_QUANTITY: {
      const itemToUpdate = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemToUpdate) {
        const quantityDifference =
          action.payload.quantity - itemToUpdate.quantity;

        return {
          ...state,
          numItems: state.numItems + quantityDifference,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
      }
      return state;
    }
    case CartActionTypes.REMOVE_CART_ITEM: {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );

      if (itemToRemove) {
        return {
          ...state,
          numItems: state.numItems - itemToRemove.quantity,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      }
      return state;
    }
    case CartActionTypes.CLEAR_CART: {
      return {
        ...state,
        numItems: 0,
        items: [],
      };
    }
    default:
      return state;
  }
};

interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<CartActions>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps extends React.PropsWithChildren {}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("CartContext used outside its provider");
  }

  return context;
};

export { CartProvider, useCart };
