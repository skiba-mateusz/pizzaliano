import React from "react";
import { Hero } from "./Hero";
import { Promotions } from "./Promotions";
import { WhyChooseUs } from "./WhyChooseUs";

export const HomeView: React.FC = () => {
  return (
    <>
      <Hero />
      <Promotions />
      <WhyChooseUs />
    </>
  );
};
