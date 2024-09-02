import classNames from "classnames";
import React from "react";

const variants = {
  filled: "bg-rose-500 text-neutral-50 focus:ring-2 ring-rose-300",
  outlined:
    "border border-solid border-rose-500 text-rose-500 focus:ring-2 ring-rose-300",
  transparent: "hover:opacity-75 focus:bg-neutral-200",
};

const sizes = {
  small: "text-sm",
  medium: "text-md",
  large: "text-lg",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  iconOnly?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "filled",
  size = "medium",
  iconOnly = false,
  className,
  children,
  ...restProps
}) => {
  return (
    <button
      className={classNames(
        "p-[.6em_1.2em] flex items-center justify-center rounded-md outline-none",
        variants[variant],
        sizes[size],
        className,
        {
          "aspect-square p-[.6em_.6em]": iconOnly,
        }
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};
