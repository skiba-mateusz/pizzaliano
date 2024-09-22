import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const MenuCategoriesSkeleton: React.FC = () => {
  return (
    <div className="p-4 flex justify-center gap-2 md:gap-4">
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton height="h-12" width="w-24" key={i} />
      ))}
    </div>
  );
};
