import React, { useId, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import { DrawerProvider } from "./DrawerContext";

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
  const ref = useRef<HTMLDivElement | null>(null);

  return createPortal(
    <DrawerProvider onClose={onClose} titleID={titleID}>
      <CSSTransition
        nodeRef={ref}
        in={open}
        classNames={classNames({
          "drawer-right": position === "right",
          "drawer-left": position === "left",
        })}
        timeout={300}
        unmountOnExit
      >
        <div
          ref={ref}
          className={classNames(
            "fixed top-0 bottom-0 w-full sm:max-w-[32rem] flex flex-col bg-neutral-50 border border-neutral-300 z-20 origin-top",
            className,
            position === "right" ? "right-0" : "left-0"
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleID}
        >
          {children}
        </div>
      </CSSTransition>
    </DrawerProvider>,
    document.body
  );
};
