import React, { useEffect, useId, useRef } from "react";
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
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      closeBtnRef?.current?.focus();
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return createPortal(
    <DrawerProvider
      onClose={onClose}
      titleID={titleID}
      closeBtnRef={closeBtnRef}
    >
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
      {open && (
        <div
          className="fixed inset-0 bg-neutral-900 opacity-25 z-10"
          onClick={onClose}
        ></div>
      )}
    </DrawerProvider>,
    document.body
  );
};
