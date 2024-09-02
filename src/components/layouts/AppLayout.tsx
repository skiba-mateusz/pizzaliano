import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Container } from "../Container";

export const AppLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Container variant="wide" className="bg-red-500">
          <h1>TEst</h1>
        </Container>
        <Outlet />
      </main>
    </>
  );
};
