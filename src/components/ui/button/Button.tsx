import classNames from "classnames";
import React from "react";
import { Link, LinkProps } from "react-router-dom";

const variants = {
  filled:
    "bg-rose-500 text-neutral-50 focus:ring-2 ring-rose-300 hover:opacity-75",
  outlined:
    "border border-solid border-rose-500 text-rose-500 focus:ring-2 ring-rose-300 hover:bg-rose-50",
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

type LinkButtonProps = Omit<ButtonProps, "onClick" | "type" | "disabled"> &
  LinkProps;
type NativeButtonProps = Omit<ButtonProps, "to">;

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
    "flex items-center justify-center gap-2 rounded-md outline-none transition-color duration-200 ring-offset-1",
    variants[variant],
    sizes[size],
    className,
    {
      "aspect-square p-[.6em]": iconOnly,
    },
    {
      "p-[.6em_1.2em]": !iconOnly,
    }
  );

  if (to) {
    const linkProps = restProps as LinkButtonProps;
    return (
      <Link className={classes} {...linkProps} to={to}>
        {children}
      </Link>
    );
  }

  const buttonProps = restProps as NativeButtonProps;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
};
