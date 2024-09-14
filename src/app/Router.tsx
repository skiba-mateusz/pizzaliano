import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "@/components/layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        lazy: async () => {
          const { HomeRoute } = await import("./routes/Home");
          return { Component: HomeRoute };
        },
      },
      {
        path: "/menu",
        lazy: async () => {
          const { MenuRoute } = await import("./routes/Menu");
          return { Component: MenuRoute };
        },
      },
      {
        path: "/cart",
        lazy: async () => {
          const { CartRoute } = await import("./routes/Cart");
          return { Component: CartRoute };
        },
      },
      {
        path: "/order",
        lazy: async () => {
          const { CreateOrderRoute } = await import("./routes/CreateOrder");
          return { Component: CreateOrderRoute };
        },
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
