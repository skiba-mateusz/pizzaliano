import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

const variants = {
  filled: "bg-rose-500 text-neutral-50 focus:ring-2 ring-rose-300",
  outlined:
    "border border-solid border-rose-500 text-rose-500 focus:ring-2 ring-rose-300",
  transparent: "hover:opacity-75 focus:bg-neutral-200",
};

const sizes = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  iconOnly?: boolean;
  to?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "filled",
  size = "medium",
  iconOnly = false,
  to = "",
  className,
  children,
  ...restProps
}) => {
  const classes = classNames(
    "p-[.6em_1.2em] flex items-center justify-center rounded-md outline-none",
    variants[variant],
    sizes[size],
    className,
    {
      "aspect-square p-[.8em]": iconOnly,
    }
  );

  if (to != "") {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...restProps}>
      {children}
    </button>
  );
};
