import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Bars3BottomLeftIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Container } from "../ui/container/Container";
import { Button } from "../ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
];

export const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="py-3 shadow-md">
      <Container className="flex items-center justify-between">
        <Nav />
        <Button
          className="md:hidden"
          variant="transparent"
          size="small"
          onClick={() => setIsNavOpen(true)}
          iconOnly={true}
        >
          <Bars3BottomLeftIcon className="size-6" />
          <span className="sr-only">Open nav</span>
        </Button>
        <Logo />
        <Button variant="transparent" onClick={() => setIsCartOpen(true)}>
          <ShoppingCartIcon className="size-6" />
          <span className="sr-only">Open cart</span>
        </Button>

        {/* Cart Drawer */}
        <Drawer
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          position="right"
        >
          <DrawerHeader>
            <DrawerTitle>Cart</DrawerTitle>
          </DrawerHeader>
          <DrawerContent>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
              quidem!
            </p>
          </DrawerContent>
          <DrawerFooter>
            <Button to="/cart" onClick={() => setIsCartOpen(false)}>
              Cart
            </Button>
            <Button
              className="mt-4"
              to="/order"
              onClick={() => setIsCartOpen(false)}
              variant="outlined"
            >
              Order
            </Button>
          </DrawerFooter>
        </Drawer>

        {/* Navigation Drawer */}
        <Drawer
          open={isNavOpen}
          onClose={() => setIsNavOpen(false)}
          position="left"
        >
          <DrawerHeader>
            <DrawerTitle>Pizzaliano</DrawerTitle>
          </DrawerHeader>
          <DrawerContent>
            <MobileNav onNavLinkClick={() => setIsNavOpen(false)} />
          </DrawerContent>
        </Drawer>
      </Container>
    </header>
  );
};

const Logo: React.FC = () => {
  return (
    <Link
      to="/"
      className="font-heading tracking-wide text-rose-500 font-bold text-3xl"
    >
      Pizzaliano
    </Link>
  );
};

const Nav: React.FC = () => {
  return (
    <nav className="hidden md:block">
      <ul className="flex gap-4">
        {navLinks.map((navLink) => (
          <li key={navLink.label}>
            <NavLink to={navLink.to}>{navLink.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const MobileNav: React.FC<{ onNavLinkClick: () => void }> = ({
  onNavLinkClick,
}) => {
  return (
    <nav>
      <ul className="grid gap-4">
        {navLinks.map((navLink) => (
          <li key={navLink.label}>
            <NavLink
              className="p-2 block text-center"
              to={navLink.to}
              onClick={onNavLinkClick}
            >
              {navLink.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
