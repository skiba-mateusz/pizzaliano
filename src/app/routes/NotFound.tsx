import React from "react";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Container } from "@/components/ui/container";

export const NotFoundRoute: React.FC = () => {
  return (
    <section className="py-8">
      <Container className="text-center grid gap-4" variant="narrow">
        <Heading level="h1">404 - Not Found</Heading>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" replace>
          Go To Home
        </Link>
      </Container>
    </section>
  );
};
