import React from "react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Head } from "@/components/seo";
import { MenuList } from "@/features/menu/components/MenuList";
import { useMenu } from "@/features/menu/contexts/MenuContext";

export const HomeRoute: React.FC = () => {
  return (
    <>
      <Head
        title="Welcome To Our Restaurant"
        description="Discover our delicious menu with fast delivery, good prices and excellent tase. Order now and experience the best food in the town"
      />
      <Hero />
      <Promotions />
      <WhyChooseUs />
    </>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="my-12">
      <Container className="flex flex-col items-center justify-center md:flex-row">
        <HeroContent />
        <HeroImage />
      </Container>
    </section>
  );
};

const HeroContent: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <Heading className="text-center" level="h1" variant="plain">
        Everything you need is around.{" "}
        <span className="text-rose-500">enjoy the taste</span>
      </Heading>
      <div className="mx-auto flex gap-4">
        <Button to="/menu">See Menu</Button>
        <Button to="/order" variant="outlined">
          Order Now
        </Button>
      </div>
    </div>
  );
};

const HeroImage: React.FC = () => {
  return (
    <div className="flex-1">
      <img
        className="m-auto"
        src="/hero-pizza.png"
        alt="Delicious pizza slice"
        width={492}
        height={492}
      />
    </div>
  );
};

const Promotions: React.FC = () => {
  const { items } = useMenu();
  return (
    <section className="my-12">
      <Container variant="narrow">
        <Heading level="h2">Promotions</Heading>
        <MenuList items={items.promotions} />
      </Container>
    </section>
  );
};

const WhyChooseUs: React.FC = () => {
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
