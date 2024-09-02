import React from "react";
import { Container } from "@/components/ui/container";

export const HomeRoute: React.FC = () => {
  return (
    <>
      <Hero />
      <Featured />
      <About />
    </>
  );
};

const Hero: React.FC = () => {
  return (
    <section>
      <Container>
        <h1>Hero</h1>
      </Container>
    </section>
  );
};

const Featured: React.FC = () => {
  return (
    <section>
      <Container>
        <h1>Featured</h1>
      </Container>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section>
      <Container>
        <h1>About</h1>
      </Container>
    </section>
  );
};
