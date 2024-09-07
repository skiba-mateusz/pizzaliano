import React, { createContext, useContext, useId } from "react";
import classNames from "classnames";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import { Button } from "../button";
import { DrawerProvider, useDrawer } from "./DrawerContext";

interface DrawerProps extends React.PropsWithChildren {
  open: boolean;
  position: "left" | "right";
  className?: string;
  onClose: () => void;
}

export interface DrawerComponentProps extends React.PropsWithChildren {
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  position = "right",
  className,
  onClose,
  children,
}) => {
  const titleID = useId();
  if (!open) return null;

  return createPortal(
    <DrawerProvider onClose={onClose} titleID={titleID}>
      <div
        className={classNames(
          "fixed top-0 bottom-0 w-full sm:max-w-[24rem] flex flex-col bg-neutral-50 border border-neutral-300 z-20",
          className,
          position === "right" ? "right-0" : "left-0"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleID}
      >
        {children}
      </div>
    </DrawerProvider>,
    document.body
  );
};
