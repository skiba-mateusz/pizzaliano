import React from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const Hero: React.FC = () => {
  return (
    <section className="my-12">
      <Container className="flex flex-col items-center justify-center md:flex-row">
        <div className="flex-1 flex flex-col gap-8">
          <h1 className="font-heading tracking-wide text-center text-5xl sm:text-6xl">
            Everything you need is around.{" "}
            <span className="text-rose-500">enjoy the taste</span>
          </h1>
          <div className="mx-auto flex gap-4">
            <Button to="/menu">See Menu</Button>
            <Button to="/order" variant="outlined">
              Order Now
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <img
            className="m-auto"
            src="/images/hero-pizza.png"
            alt="Delicious pizza slice"
            fetchPriority="high"
            width={492}
            height={492}
          />
        </div>
      </Container>
    </section>
  );
};
