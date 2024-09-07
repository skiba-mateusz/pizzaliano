import classNames from "classnames";
import { useDrawer } from "./DrawerContext";
import { DrawerComponentProps } from "./Drawer";

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
