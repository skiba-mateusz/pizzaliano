import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const MenuSkeleton: React.FC = () => {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 md:grid-cols-4">
      {Array.from({ length: 4 }, (_, i) => (
        <div className="flex flex-col gap-8" key={i}>
          <Skeleton aspectRatio="1/1" />
          <Skeleton height="h-6" />
          <div className="flex flex-col gap-4">
            <Skeleton />
            <Skeleton />
          </div>
          <Skeleton height="h-8" />
        </div>
      ))}
    </div>
  );
};
