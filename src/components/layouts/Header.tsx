import React from "react";
import { Container } from "../ui/container/Container";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
];

export const Header: React.FC = () => {
  return (
    <header className="py-3 shadow-md">
      <Container className="flex items-center justify-between">
        <Nav />
        <Link to="/" className="text-rose-500 font-bold text-2xl">
          Pizzaliano
        </Link>
        <button className="flex items-center gap-2 font-medium">
          <ShoppingCartIcon className="size-6" />
          Cart
        </button>
      </Container>
    </header>
  );
};

const Nav: React.FC = () => {
  return (
    <nav>
      <ul className="flex gap-4">
        {navLinks.map((navLink) => (
          <li>
            <NavLink to={navLink.to}>{navLink.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
