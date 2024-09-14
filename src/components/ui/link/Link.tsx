import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import classNames from "classnames";

interface LinkProps extends RouterLinkProps {
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ to, className, children }) => {
  return (
    <RouterLink
      to={to}
      className={classNames(
        "underline-offset-2 text-neutral-700 hover:underline",
        className
      )}
    >
      {children}
    </RouterLink>
  );
};
