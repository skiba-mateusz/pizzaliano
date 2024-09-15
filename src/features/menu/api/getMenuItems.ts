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
      categories (*),
      promotions (*)
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
      throw new Error(categoryError.message);
    }

    query = query.eq("category_id", category?.id);
  }

  if (promotions) {
    query = query.not("promotion_id", "is", null);
  }

  const {
    data: menuItems,
    error: menuItemsError,
    count,
  } = await query.returns<MenuItem[]>();
  if (menuItemsError) {
    throw new Error(menuItemsError.message);
  }

  const categorizedMenuItems: CategorizedMenuItems = menuItems.reduce(
    (acc, item) => {
      const category = item.categories.slug;
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

export const useMenuItems = (params: GetMenuItemsParams) => {
  const [data, setData] = useState<GetMenuItemsResponse>({
    categorizedMenuItems: {},
    count: 0,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const categorySlugParam = searchParams.get("category");
  if (categorySlugParam) {
    if (categorySlugParam !== "all" && categorySlugParam !== "promotions") {
      params.categorySlug = categorySlugParam;
    }

    if (categorySlugParam === "promotions") {
      params.promotions = true;
    }
  }

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        const response = await getMenuItems(params);
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
  }, [categorySlugParam]);

  return { data, isLoading, error };
};
