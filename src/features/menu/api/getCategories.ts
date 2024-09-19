import supabase from "@/lib/supabaseClient";
import { Category } from "@/types/api";
import { useEffect, useState } from "react";

const getCategories = async () => {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("createdAt", { ascending: true })
    .returns<Category[]>();

  if (error) {
    console.error(error);
    throw new Error("Could not load categories");
  }

  return categories || [];
};

export const useCategories = () => {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setError("");
        setIsLoading(true);
        const response = await getCategories();
        setData(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories: data, isLoading, error };
};
