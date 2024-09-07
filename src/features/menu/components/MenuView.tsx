import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import menuData from "@/data/menu.json";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { MenuList } from "./MenuList";
import { Loader } from "@/components/ui/loader/Loader";
import { useFetch } from "@/hooks/useFetch";
import { CategoryType, Menu, MenuItem as MenuItemType } from "../types";
import { MenuCategories } from "./MenuCategories";

export const MenuView: React.FC = () => {
  const { data: menu, isLoading } = useFetch(menuData as Menu);
  const [searchParams] = useSearchParams();

  const categorizedMenuItems = useMemo(() => {
    const categories: Record<CategoryType, MenuItemType[]> = {
      promotions: [],
      pizzas: [],
      burgers: [],
      drinks: [],
    };

    const categoryParam = searchParams.get("category") || "";

    menu.items?.forEach((item) => {
      item.categories.forEach((category) => {
        if (category !== categoryParam && categoryParam !== "") return;
        categories[category].push(item);
      });
    });

    return categories;
  }, [menu, searchParams]);

  return !isLoading ? (
    <>
      <MenuCategories categories={menu.categories} />
      {Object.keys(categorizedMenuItems).map((category) => {
        if (categorizedMenuItems[category as CategoryType].length > 0)
          return (
            <section className="py-6" key={category}>
              <Container variant="narrow">
                <Heading level="h2">{category}</Heading>
                <MenuList
                  items={categorizedMenuItems[category as CategoryType]}
                />
              </Container>
            </section>
          );
      })}
      )
    </>
  ) : (
    <Loader />
  );
};
