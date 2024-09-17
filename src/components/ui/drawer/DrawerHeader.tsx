import classNames from "classnames";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "../button";
import { useDrawer } from "./DrawerContext";
import { DrawerComponentProps } from "./Drawer";

export const DrawerHeader: React.FC<DrawerComponentProps> = ({
  className,
  children,
}) => {
  const { onClose, closeBtnRef } = useDrawer();

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
        ref={closeBtnRef}
      >
        <XMarkIcon className="size-6" />
        <span className="sr-only">Close modal</span>
      </Button>
    </header>
  );
};
