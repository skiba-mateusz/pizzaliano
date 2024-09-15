import React from "react";
import { Heading } from "../ui/heading";
import { Button } from "../ui/button";

export const MainErrorFallback: React.FC = () => {
  return (
    <div
      className="h-screen w-screen flex flex-col gap-8 items-center justify-center"
      role="alert"
    >
      <Heading level="h2" variant="plain">
        Ooops, something went wrong :(
      </Heading>
      <Button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};
