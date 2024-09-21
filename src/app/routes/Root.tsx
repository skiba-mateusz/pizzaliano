import React, { Suspense } from "react";
import { AppLayout } from "@/components/layouts";
import { FullPageLoader } from "@/components/ui/loader";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

export const Root: React.FC = () => {
  return (
    <AppLayout>
      <Suspense fallback={<FullPageLoader />}>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </AppLayout>
  );
};
