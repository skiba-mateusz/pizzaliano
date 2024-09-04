import React from "react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { useMenu } from "../contexts/MenuContext";
import { MenuList } from "./MenuList";

export const MenuView: React.FC = () => {
  const { items } = useMenu();

  return (
    <>
      {Object.keys(items).map((type) => {
        const filterType = type as keyof typeof items;
        if (items[filterType].length > 0)
          return (
            <section className="py-6" key={filterType}>
              <Container variant="narrow">
                <Heading level="h2">{filterType}</Heading>
                <MenuList items={items[filterType]} />
              </Container>
            </section>
          );
      })}
    </>
  );
};
