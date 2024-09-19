import React from "react";
import { MenuItem } from "./MenuItem";
import { MenuItem as MenuItemType } from "@/types/api";
import { Message } from "@/components/ui/message";

export const MenuList: React.FC<{ items: MenuItemType[] }> = ({ items }) => {
  if (items.length === 0) {
    return <Message variant="info">There are no items to display</Message>;
  }

  return (
    <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 md:grid-cols-4">
      {items.map((item) => (
        <MenuItem item={item} key={item.id} />
      ))}
    </ul>
  );
};
