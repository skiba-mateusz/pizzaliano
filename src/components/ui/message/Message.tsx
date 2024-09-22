import React from "react";
import classNames from "classnames";

const variants = {
  info: "text-neutral-700 bg-neutral-100",
  error: "bg-rose-200 text-rose-800",
  success: "",
};

interface MessageProps extends React.PropsWithChildren {
  variant: keyof typeof variants;
  className?: string;
}

export const Message: React.FC<MessageProps> = ({
  className,
  variant,
  children,
}) => {
  const role = variant === "error" ? "alert" : "status";

  return (
    <div
      className={classNames(
        "p-4 rounded-md shadow-sm",
        variants[variant],
        className
      )}
      role={role}
    >
      {children}
    </div>
  );
};
