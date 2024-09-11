import React from "react";
import promotionsData from "@/data/promotions.json";
import { Container } from "@/components/ui/container";
import { MenuList } from "@/features/menu/components/MenuList";
import { MenuItem } from "@/features/menu/types";
import { Heading } from "@/components/ui/heading";

export const Promotions: React.FC = () => {
  return (
    <section className="my-12">
      <Container variant="narrow">
        <Heading level="h2">Promotions</Heading>
        <MenuList items={promotionsData as MenuItem[]} />
      </Container>
    </section>
  );
};
