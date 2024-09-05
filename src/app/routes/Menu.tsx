import React from "react";
import { MenuView } from "@/features/menu/components/MenuView";
import { Head } from "@/components/seo";

export const MenuRoute: React.FC = () => {
  return (
    <>
      <Head
        title="Explore Our Menu"
        description="Discover our diverse menu featuring a wide range of delicious dishes. Find your new favorite meal today!"
      />
      <MenuView />
    </>
  );
};
