import React from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Image } from "@/components/ui/image";

export const Hero: React.FC = () => {
  return (
    <section className="py-8">
      <Container className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="flex-1 flex flex-col gap-8">
          <h1 className="font-heading tracking-wide text-center text-5xl sm:text-6xl">
            Everything you need is around.{" "}
            <span className="text-rose-500">enjoy the taste</span>
          </h1>
          <div className="mx-auto flex gap-4">
            <Button to="/menu">See Menu</Button>
            <Button to="/order/create" variant="outlined">
              Order Now
            </Button>
          </div>
        </div>
        <div className="">
          <Image
            src="/images/hero-pizza.png"
            alt="Delicious pizza slice"
            fetch
            width={492}
            height={392}
          />
        </div>
      </Container>
    </section>
  );
};
