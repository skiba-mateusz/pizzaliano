import React, { useEffect, useRef } from "react";
import { Loader } from "@/components/ui/loader/Loader";
import { useSearchParams } from "react-router-dom";
import { useMenuItems } from "@/features/menu/api/getMenuItems";
import { MenuCategories } from "@/features/menu/components/MenuCategories";
import { MenuSection } from "@/features/menu/components/MenuSection";
import { Head } from "@/components/seo";
import { FadeIn } from "@/components/ui/fade-in";
import { Message } from "@/components/ui/message";
import { Container } from "@/components/ui/container";

export const MenuRoute: React.FC = () => {
  const {
    data: { categorizedMenuItems },
    isLoading,
    error,
  } = useMenuItems();
  const [searchParams] = useSearchParams();
  const ref = useRef<HTMLDivElement | null>(null);

  const categorySlugParam = searchParams.get("category");

  useEffect(() => {
    if (!isLoading && ref.current) {
      ref.current.classList.remove("translate-y-16");
      ref.current.classList.remove("opacity-0");
    }
  }, [isLoading]);

  if (error) {
    return (
      <Container>
        <Message variant="error">{error}</Message>
      </Container>
    );
  }

  return (
    <>
      <Head
        title="Explore Our Menu"
        description="Discover our diverse menu featuring a wide range of delicious dishes. Find your new favorite meal today!"
      />
      <MenuCategories isLoadingMenu={isLoading} />
      {!isLoading ? (
        <FadeIn>
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
        </FadeIn>
      ) : (
        <Loader />
      )}
    </>
  );
};
