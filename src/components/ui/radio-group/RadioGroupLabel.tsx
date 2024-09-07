import React from "react";

export const RadioGroupLabel: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <legend className="sr-only">{children}</legend>;
};
