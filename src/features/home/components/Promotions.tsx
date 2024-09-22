import React from "react";
import { Container } from "@/components/ui/container";
import { MenuList } from "@/features/menu/components/MenuList";
import { Heading } from "@/components/ui/heading";
import { useMenuItems } from "@/features/menu/api/getMenuItems";
import { Loader } from "@/components/ui/loader/Loader";
import { Message } from "@/components/ui/message";

export const Promotions: React.FC = () => {
  const {
    data: { categorizedMenuItems },
    isLoading,
    error,
  } = useMenuItems({ promotions: true });

  const items = Object.values(categorizedMenuItems).flat();

  return (
    <section className="py-8">
      <Container variant="narrow">
        <Heading level="h2">Promotions</Heading>
        {error ? (
          <Message variant="error">{error}</Message>
        ) : !isLoading ? (
          <MenuList items={items} />
        ) : (
          <Loader />
        )}
      </Container>
    </section>
  );
};
