import React from "react";
import { useSearchParams } from "react-router-dom";
import { useMenuItems } from "@/features/menu/api/getMenuItems";
import { MenuCategories } from "@/features/menu/components/MenuCategories";
import { MenuSection } from "@/features/menu/components/MenuSection";
import { Head } from "@/components/seo";
import { FadeIn } from "@/components/ui/fade-in";
import { Message } from "@/components/ui/message";
import { Container } from "@/components/ui/container";
import { MenuSkeleton } from "@/features/menu/components/MenuSkeleton";

export const MenuRoute: React.FC = () => {
  const {
    data: { categorizedMenuItems },
    isLoading,
    error,
  } = useMenuItems();
  const [searchParams] = useSearchParams();

  const categorySlugParam = searchParams.get("category");

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
      <MenuCategories />
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
        <Container variant="narrow">
          <MenuSkeleton />
        </Container>
      )}
    </>
  );
};
