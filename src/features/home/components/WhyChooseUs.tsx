import React from "react";
import { Heading } from "@/components/ui/heading";
import { Container } from "@/components/ui/container";

const WhyUsCard: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <article className="p-6 flex-1 bg-neutral-50 rounded-md shadow-md">
      <header>
        <Heading className="text-center" level="h3" variant="plain">
          {title}
        </Heading>
      </header>
      <p className="mt-2 text-neutral-700 text-center">{description}</p>
    </article>
  );
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="my-12 grid grid-cols-1 grid-rows-[6rem_6rem_auto]">
      <div className="col-span-full row-span-full bg-rose-500 md:row-start-1 md:row-end-3">
        <Heading
          className="mt-8 text-neutral-50 text-center"
          variant="plain"
          level="h2"
        >
          Why To choose us?
        </Heading>
      </div>
      <Container className="col-span-full row-start-2 row-end-4 flex flex-col gap-8 md:flex-row md:gap-8 lg:gap-16">
        <WhyUsCard
          title="Fast Delivery"
          description="Customer satisfaction is our top priority, so we ensure that your order arrives quickly."
        />
        <WhyUsCard
          title="Affordable Prices"
          description="We offer delicious food at affordable prices, making every bite worth your money."
        />
        <WhyUsCard
          title="Excellent Taste"
          description="Our food is crafted by the best chefs from around the world, making it incredibly tasty."
        />
      </Container>
    </section>
  );
};
