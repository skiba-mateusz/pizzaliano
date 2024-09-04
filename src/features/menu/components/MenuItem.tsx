import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { MenuItem as MenuItemType } from "../contexts/MenuContext";

export const MenuItem: React.FC<{ item: MenuItemType }> = ({ item }) => {
  return (
    <li>
      <article className="h-full flex flex-col border-b border-neutral-200 hover:shadow-md">
        <img
          className="rounded-md aspect-square object-cover"
          loading="lazy"
          src={item.image}
          alt={item.name}
        />

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
            <Button variant="outlined" iconOnly={true} size="small">
              <ShoppingCartIcon className="size-6" />
              <span className="sr-only">Add To Cart</span>
            </Button>
            {item.onPromotion ? (
              <div className="ml-auto text-right">
                <span className="text-neutral-700 text-sm line-through">
                  <span className="sr-only">Original price: </span>$
                  {item.originalPrice?.toFixed(2)}
                </span>
                <span className="ml-1 text-lg font-bold sm:text-xl ">
                  <span className="sr-only">Discounted price: </span>$
                  {item.currentPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="ml-auto text-lg font-bold sm:text-xl">
                <span className="sr-only">Price: </span>$
                {item.currentPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </article>
    </li>
  );
};
