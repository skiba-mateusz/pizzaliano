import { Head } from "@/components/seo";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import React from "react";

export const OrderConfirmationRoute: React.FC = () => {
  return (
    <>
      <Head
        title="Order Confirmation"
        description="Thank you for your order. We ensure that it arrives as quickly as possible."
      />
      <section>
        <Container variant="narrow">
          <Heading level="h1">Order Confirmation</Heading>
          <p className="max-w-[32rem] mx-auto p-4 mt-6 text-xl text-center rounded-md shadow-md ">
            Thank you for your order. We ensure that it arrives as quickly as
            possible :)
          </p>
        </Container>
      </section>
    </>
  );
};
