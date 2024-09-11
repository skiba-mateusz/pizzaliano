import React from "react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { useCart } from "../contexts/CartContext";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CartActionTypes, CartItem as CartItemType } from "../types";

interface QuantityControlsProps {
  quantity: number;
  name: string;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityControls: React.FC<QuantityControlsProps> = ({
  quantity,
  name,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex items-center gap-2 text-rose-500 border border-rose-500 rounded-full overflow-hidden">
      <button
        className="p-[.5em] aspect-square border-r border-rose-500 outline-none hover:bg-rose-50 focus:bg-rose-50"
        onClick={onIncrease}
      >
        <PlusIcon className="size-5" />
        <span className="sr-only">Increase quantity of {name}</span>
      </button>
      <div className="px-2">{quantity}</div>
      <button
        className="p-[.5em] aspect-square border-l border-rose-500 outline-none hover:bg-rose-50 focus:bg-rose-50"
        onClick={onDecrease}
      >
        <MinusIcon className="size-5" />
        <span className="sr-only">Decrease quantity of {name}</span>
      </button>
    </div>
  );
};

export const CartItem: React.FC<{ item: CartItemType }> = ({ item }) => {
  const { dispatch } = useCart();

  const decreaseQuantity = () => {
    dispatch({
      type: CartActionTypes.UPDATE_CART_ITEM_QUANTITY,
      payload: {
        quantity: item.quantity > 1 ? item.quantity - 1 : 1,
        id: item.id,
      },
    });
  };

  const increaseQuantity = () => {
    dispatch({
      type: CartActionTypes.UPDATE_CART_ITEM_QUANTITY,
      payload: {
        quantity: item.quantity + 1,
        id: item.id,
      },
    });
  };

  const removeItem = () => {
    dispatch({
      type: CartActionTypes.REMOVE_CART_ITEM,
      payload: item.id,
    });
  };

  return (
    <li>
      <article className="flex items-center gap-4">
        <img
          className="w-[6rem] md:w-[8rem] rounded-md aspect-square object-cover"
          src={item.image}
          alt={`${item.name} - ${item.description}`}
        />
        <div className="flex-1 flex items-center flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex-1">
              <div>
                <Heading level="h3" variant="plain" className="leading-none">
                  {item.name}
                </Heading>
                <p className="text-neutral-700 hidden md:block">
                  {item.description}
                </p>
              </div>
            </div>
            {item.onPromotion && item.originalPrice ? (
              <div className="text-right">
                <span className="text-neutral-700 text-sm line-through">
                  <span className="sr-only">Original price: </span>$
                  {(item.originalPrice * item.quantity).toFixed(2)}
                </span>
                <span className="ml-1 text-lg font-bold leading-none sm:text-xl ">
                  <span className="sr-only">Discounted price: </span>$
                  {(item.currentPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="ml-auto text-lg font-bold sm:text-xl">
                <span className="sr-only">Price: </span>$
                {(item.currentPrice * item.quantity).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex justify-end gap-2 grow w-full">
            <QuantityControls
              quantity={item.quantity}
              name={item.name}
              onDecrease={decreaseQuantity}
              onIncrease={increaseQuantity}
            />
            <Button iconOnly size="small" onClick={removeItem}>
              <TrashIcon className="size-5" />
              <span className="sr-only">Remove {item.name} from cart</span>
            </Button>
          </div>
        </div>
      </article>
    </li>
  );
};
