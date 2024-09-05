import React, { createContext, useContext, useId } from "react";
import classNames from "classnames";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import { Button } from "../button";

interface DrawerProps extends React.PropsWithChildren {
  open: boolean;
  position: "left" | "right";
  className?: string;
  onClose: () => void;
}

interface DrawerContextProps {
  onClose: () => void;
  titleID: string;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const Drawer: React.FC<DrawerProps> = ({
  open,
  position = "right",
  className,
  onClose,
  children,
}) => {
  if (!open) return null;

  const titleID = useId();

  return createPortal(
    <DrawerContext.Provider value={{ onClose, titleID }}>
      <div
        className={classNames(
          "fixed top-0 bottom-0 w-full sm:max-w-[24rem] flex flex-col bg-neutral-50 border border-neutral-300",
          className,
          position === "right" ? "right-0" : "left-0"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleID}
      >
        {children}
      </div>
    </DrawerContext.Provider>,
    document.body
  );
};

const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) throw new Error("useDrawer used outside its provider");

  return context;
};

interface DrawerComponentProps extends React.PropsWithChildren {
  className?: string;
}

export const DrawerHeader: React.FC<DrawerComponentProps> = ({
  className,
  children,
}) => {
  const { onClose } = useDrawer();

  return (
    <header
      className={classNames(
        "p-4 flex items-center justify-between flex-wrap border-b border-neutral-300",
        className
      )}
    >
      {children}
      <Button
        variant="transparent"
        size="small"
        iconOnly={true}
        onClick={() => onClose()}
      >
        <XMarkIcon className="size-6" />
        <span className="sr-only">Close modal</span>
      </Button>
    </header>
  );
};

export const DrawerTitle: React.FC<DrawerComponentProps> = ({
  className,
  children,
}) => {
  const { titleID } = useDrawer();
  return (
    <h3
      className={classNames(
        "font-heading font-bold text-3xl tracking-wide",
        className
      )}
      id={titleID}
    >
      {children}
    </h3>
  );
};

export const DrawerContent: React.FC<DrawerComponentProps> = ({
  className,
  children,
}) => {
  return <div className={classNames("p-4 flex-1", className)}>{children}</div>;
};

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
