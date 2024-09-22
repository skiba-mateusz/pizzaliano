import React from "react";
import { Head } from "@/components/seo";
import { Hero } from "@/features/home/components/Hero";
import { Promotions } from "@/features/home/components/Promotions";
import { WhyChooseUs } from "@/features/home/components/WhyChooseUs";

export const HomeRoute: React.FC = () => {
  return (
    <>
      <Head
        title="Welcome To Our Restaurant"
        description="Discover our delicious menu with fast delivery, good prices and excellent tase. Order now and experience the best food in the town"
      />
      <Hero />
      <WhyChooseUs />
      <Promotions />
    </>
  );
};
