import React from "react";
import { Loader } from "./Loader";

export const FullPageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 grid place-items-center bg-neutral-50 z-50">
      <Loader size="huge" />
    </div>
  );
};
