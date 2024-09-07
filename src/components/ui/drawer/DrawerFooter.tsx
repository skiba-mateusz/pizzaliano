import React from "react";
import classNames from "classnames";

import { DrawerComponentProps } from "./Drawer";

export const DrawerFooter: React.FC<DrawerComponentProps> = ({
  className,
  children,
}) => {
  return (
    <footer
      className={classNames("border-t border-neutral-300 p-4", className)}
    >
      {children}
    </footer>
  );
};
