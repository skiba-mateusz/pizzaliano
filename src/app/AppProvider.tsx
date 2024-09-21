import React from "react";
import { CartProvider } from "@/features/cart/contexts/CartContext";
import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "@/components/errors/MainErrorFallback";
import { FullPageLoader } from "@/components/ui/loader";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <React.Suspense fallback={<FullPageLoader />}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <CartProvider>{children}</CartProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
