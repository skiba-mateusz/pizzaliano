import classNames from "classnames";
import React from "react";

const levels = {
  h1: "text-6xl",
  h2: "text-4xl",
  h3: "text-3xl",
  h4: "text-2xl",
  h5: "text-xl",
  h6: "text-lg",
};

const variants = {
  plain: "",
  outlined:
    "flex items-center gap-[.4em] before:h-[.1em] before:flex-1 before:bg-rose-500 before:rounded-md after:h-[.1em] after:flex-1 after:bg-rose-500 after:rounded-md",
};

interface HeadingProps {
  level: keyof typeof levels;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  variant = "outlined",
  className,
  children,
}) => {
  return React.createElement(
    level,
    {
      className: classNames(
        "font-heading tracking-wide",
        levels[level],
        variants[variant],
        className
      ),
    },
    children
  );
};
