import classNames from "classnames";
import { DrawerComponentProps } from "./Drawer";

export const DrawerContent: React.FC<DrawerComponentProps> = ({
  className,
  children,
}) => {
  return <div className={classNames("p-4 flex-1", className)}>{children}</div>;
};
