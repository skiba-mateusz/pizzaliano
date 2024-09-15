import React from "react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { MenuList } from "./MenuList";
import { MenuItem } from "@/types/api";

interface MenuSectionProps {
  category: string;
  items: MenuItem[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  category,
  items,
}) => {
  return (
    <section className="py-6">
      <Container variant="narrow">
        <Heading level="h2">{category}</Heading>
        <MenuList items={items} />
      </Container>
    </section>
  );
};
