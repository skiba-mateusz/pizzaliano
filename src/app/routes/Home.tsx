import React from "react";
import { Head } from "@/components/seo";
import { HomeView } from "@/features/home/components/HomeView";

export const HomeRoute: React.FC = () => {
  return (
    <>
      <Head
        title="Welcome To Our Restaurant"
        description="Discover our delicious menu with fast delivery, good prices and excellent tase. Order now and experience the best food in the town"
      />
      <HomeView />
    </>
  );
};
