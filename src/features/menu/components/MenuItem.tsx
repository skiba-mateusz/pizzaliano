import React from "react";
import toast from "react-hot-toast";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { MenuItem as MenuItemType } from "@/types/api";
import { useCart } from "@/features/cart/contexts/CartContext";
import { CartActionTypes } from "@/features/cart/contexts/CartContext";
import { Image } from "@/components/ui/image";

export const MenuItem: React.FC<{ item: MenuItemType }> = ({ item }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({
      type: CartActionTypes.ADD_CART_ITEM,
      payload: { ...item, quantity: 1 },
    });
    toast(`${item.name} added to cart`);
  };

  return (
    <li>
      <article className="h-full flex flex-col border-b border-neutral-200 group hover:shadow-md hover:rounded-md">
        <div className="rounded-md overflow-hidden">
          <Image
            className="aspect-square duration-200 group-hover:scale-105"
            src={item.imageUrl}
            alt={`${item.name} - ${item.description}`}
            height={360}
            width={360}
            lazy
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="p-2">
            <Heading
              className="min-h-[2em] items-start leading-none"
              level="h3"
              variant="plain"
            >
              {item.name}
            </Heading>
          </div>
          <p className="px-2 mb-2 flex-1 text-neutral-700">
            {item.description}
          </p>
          <div className="p-2 flex items-center border-t border-neutral-200">
            <Button variant="outlined" iconOnly={true} onClick={addToCart}>
              <ShoppingCartIcon className="size-6" />
              <span className="sr-only">Add To Cart</span>
            </Button>
            {item.promotion ? (
              <div className="ml-auto flex flex-col text-right">
                <span className="text-neutral-700 text-sm line-through">
                  <span className="sr-only">Original price: </span>$
                  {item.price.toFixed(2)}
                </span>
                <span className="ml-1 text-lg font-bold leading-none sm:text-xl0">
                  <span className="sr-only">Discounted price: </span>$
                  {(item.price - item.promotion.discountValue).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="ml-auto text-lg font-bold sm:text-xl">
                <span className="sr-only">Price: </span>${item.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </article>
    </li>
  );
};
