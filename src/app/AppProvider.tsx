import { MenuProvider } from "@/features/menu/contexts/MenuContext";
import React from "react";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <MenuProvider>{children}</MenuProvider>;
};
