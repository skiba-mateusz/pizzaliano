import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
        path: "/order/create",
        lazy: async () => {
          const { CreateOrderRoute } = await import(
            "./routes/orders/CreateOrder"
          );
          return { Component: CreateOrderRoute };
        },
      },
      {
        path: "*",
        lazy: async () => {
          const { NotFoundRoute } = await import("./routes/NotFound");
          return { Component: NotFoundRoute };
        },
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
