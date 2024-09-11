import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

interface LinkProps extends RouterLinkProps {
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, children }) => {
  return (
    <RouterLink
      to={to}
      className="underline-offset-2 hover:text-neutral-700 hover:underline"
    >
      {children}
    </RouterLink>
  );
};
