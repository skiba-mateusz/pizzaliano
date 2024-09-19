import React from "react";
import { Container } from "@/components/ui/container";
import { MenuList } from "@/features/menu/components/MenuList";
import { Heading } from "@/components/ui/heading";
import { useMenuItems } from "@/features/menu/api/getMenuItems";
import { Loader } from "@/components/ui/loader/Loader";

export const Promotions: React.FC = () => {
  const {
    data: { categorizedMenuItems },
    isLoading,
  } = useMenuItems({ promotions: true });

  const items = Object.values(categorizedMenuItems).flat();

  return (
    <section className="py-12">
      <Container variant="narrow">
        <Heading level="h2">Promotions</Heading>
        {!isLoading ? <MenuList items={items} /> : <Loader />}
      </Container>
    </section>
  );
};
