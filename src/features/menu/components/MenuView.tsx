import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { Loader } from "@/components/ui/loader/Loader";
import { useMenuItems } from "../api/getMenuItems";
import { useCategories } from "../api/getCategories";
import { MenuCategories } from "./MenuCategories";
import { useSearchParams } from "react-router-dom";
import { MenuSection } from "./MenuSection";

export const MenuView: React.FC = () => {
  const {
    data: { categorizedMenuItems },
    isLoading: isLoadingMenuItems,
  } = useMenuItems();
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const [searchParams] = useSearchParams();
  const ref = useRef<HTMLDivElement | null>(null);

  const categorySlugParam = searchParams.get("category");
  const isLoading = isLoadingMenuItems || isLoadingCategories;

  useEffect(() => {
    if (!isLoading && ref.current) {
      ref.current.classList.remove("translate-y-16");
      ref.current.classList.remove("opacity-0");
    }
  }, [isLoading]);

  return (
    <>
      <MenuCategories categories={categories} />
      {!isLoadingMenuItems ? (
        <div
          ref={ref}
          className={classNames("translate-y-16 opacity-0 duration-500")}
        >
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
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
