import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import {
  GetMenuItemsParams,
  Category,
  GetMenuItemsResponse,
  MenuItem,
  CategorizedMenuItems,
} from "@/types/api";
import { useSearchParams } from "react-router-dom";

const getMenuItems = async ({
  categorySlug,
  promotions,
}: GetMenuItemsParams) => {
  let query = supabase.from("menu_items").select(
    `
      *,
      category:categories (*),
      promotion:promotions (*)
      `,
    { count: "exact" }
  );

  if (categorySlug) {
    let { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single<Category>();

    if (categoryError) {
      console.error(categoryError);
      throw new Error("Could not load menu");
    }

    query = query.eq("categoryID", category?.id);
  }

  if (promotions) {
    query = query.not("promotionID", "is", null);
  }

  const {
    data: menuItems,
    error: menuItemsError,
    count,
  } = await query.returns<MenuItem[]>();

  if (menuItemsError) {
    console.error(menuItemsError);
    throw new Error("Could not load menu");
  }

  const categorizedMenuItems: CategorizedMenuItems = menuItems.reduce(
    (acc, item) => {
      const category = item.category.slug;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {} as CategorizedMenuItems
  );

  return { categorizedMenuItems, count: count ?? 0 };
};

export const useMenuItems = (initialParams: GetMenuItemsParams = {}) => {
  const [data, setData] = useState<GetMenuItemsResponse>({
    categorizedMenuItems: {},
    count: 0,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  let categorySlug = searchParams.get("category") || initialParams.categorySlug;
  let promotions =
    searchParams.get("promotions") === "true" || initialParams.promotions;

  if (categorySlug === "promotions") {
    categorySlug = "";
    promotions = true;
  }

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        const response = await getMenuItems({ categorySlug, promotions });
        setData(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, [categorySlug, promotions]);

  return { data, isLoading, error };
};
