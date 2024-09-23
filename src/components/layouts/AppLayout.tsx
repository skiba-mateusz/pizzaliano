import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "react-hot-toast";

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          className: "font-bold text-rose-500",
          duration: 3000,
        }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
};
