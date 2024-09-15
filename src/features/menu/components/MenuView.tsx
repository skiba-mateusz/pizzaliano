import React from "react";
import { Loader } from "@/components/ui/loader/Loader";
import { useMenuItems } from "../api/getMenuItems";
import { GetMenuItemsParams } from "@/types/api";
import { useCategories } from "../api/getCategories";
import { MenuCategories } from "./MenuCategories";
import { useSearchParams } from "react-router-dom";
import { MenuSection } from "./MenuSection";

export const MenuView: React.FC = () => {
  const {
    data: { categorizedMenuItems },
    isLoading: isLoadingMenuItems,
  } = useMenuItems({
    categorySlug: "",
    promotions: false,
  } as GetMenuItemsParams);
  const { categories, isLoading: isLoadingCategories } = useCategories();

  const [searchParams] = useSearchParams();

  const categorySlugParam = searchParams.get("category");
  const isLoading = isLoadingMenuItems || isLoadingCategories;

  return !isLoading ? (
    <>
      <MenuCategories categories={categories} />
      {categorySlugParam !== "promotions" ? (
        Object.keys(categorizedMenuItems).map((category) => {
          if (categorizedMenuItems[category].length > 0)
            return (
              <MenuSection
                key={category}
                category={category}
                items={categorizedMenuItems[category]}
              />
            );
        })
      ) : (
        <MenuSection
          category="Promotions"
          items={Object.values(categorizedMenuItems).flat()}
        />
      )}
      )
    </>
  ) : (
    <Loader />
  );
};
