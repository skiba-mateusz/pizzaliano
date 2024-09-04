import React from "react";
import { MenuItem as MenuItemType } from "../contexts/MenuContext";
import { MenuItem } from "./MenuItem";

export const MenuList: React.FC<{ items: MenuItemType[] }> = ({ items }) => {
  return (
    <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 md:grid-cols-4">
      {items.map((item) => (
        <MenuItem item={item} key={item.id} />
      ))}
    </ul>
  );
};
