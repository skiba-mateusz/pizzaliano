import classNames from "classnames";
import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  aspectRatio?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "W-full",
  height = "h-4",
  aspectRatio = "",
}) => {
  return (
    <div
      className={classNames(
        "bg-neutral-200 rounded-md animate-pulse",
        width,
        height,
        aspectRatio
      )}
      style={{ aspectRatio, height: aspectRatio ? "auto" : "" }}
      aria-busy="true"
      aria-label="Loading content..."
    ></div>
  );
};
