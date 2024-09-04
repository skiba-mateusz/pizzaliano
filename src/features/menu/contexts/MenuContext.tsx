import React, { useContext, useMemo, useState } from "react";
import menuItems from "@/data/menu.json";

export type FilterType = "all" | "pizzas" | "drinks" | "burgers" | "promotions";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  image: string;
  type: FilterType;
  onPromotion: boolean;
  originalPrice?: number;
  currentPrice: number;
}

interface MenuContextProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  items: Record<FilterType, MenuItem[]>;
}

const MenuContext = React.createContext<MenuContextProps | undefined>(
  undefined
);

const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [items] = useState<MenuItem[]>(menuItems as MenuItem[]);

  const groupedItems = useMemo(() => {
    const filteredItems = items.filter((item) => {
      if (filter === "promotions") {
        return item.onPromotion;
      }
      if (filter === "all") {
        return true;
      }
      return item.type === filter;
    });

    const group: Record<FilterType, MenuItem[]> = {
      all: [],
      promotions: [],
      pizzas: [],
      burgers: [],
      drinks: [],
    };

    filteredItems.forEach((item) => {
      group[item.type].push(item);
      if (item.onPromotion) {
        group.promotions.push(item);
      }
    });

    return group;
  }, [filter]);

  return (
    <MenuContext.Provider value={{ items: groupedItems, filter, setFilter }}>
      {children}
    </MenuContext.Provider>
  );
};

const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu used outside its provider");
  }
  return context;
};

export { MenuProvider, useMenu };
