import classNames from "classnames";
import React from "react";

const variants = {
  narrow: "max-w-[48rem]",
  wide: "max-w-[78rem]",
  full: "w-full",
};

interface ContainerProps {
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  variant = "wide",
  className,
  children,
}) => {
  return (
    <div className={classNames("mx-auto p-4", variants[variant], className)}>
      {children}
    </div>
  );
};
