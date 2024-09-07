import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

const sizes = {
  small: "size-8",
  medium: "size-16",
  huge: "size-32",
};

interface LoaderProps {
  size?: keyof typeof sizes;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "small",
  className,
}) => {
  return (
    <div className="my-16">
      <ArrowPathIcon
        className={classNames(sizes[size], "mx-auto animate-spin", className)}
      />
      <div className="text-center font-bold text-2xl">
        Loading in progress...
      </div>
    </div>
  );
};
