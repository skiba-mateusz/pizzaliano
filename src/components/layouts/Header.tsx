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
import { useSticky } from "@/hooks/useSticky";
import classNames from "classnames";
import { useCart } from "@/features/cart/contexts/CartContext";
import { Message } from "../ui/message";
import { CartList } from "@/features/cart/components/CartList";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
];

export const Header: React.FC = () => {
  const {
    state: { items, numItems },
  } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [ref, sticky] = useSticky();

  console.log(items);

  return (
    <header
      ref={ref}
      className={classNames(
        "top-0 sticky z-10 bg-neutral-50 transition-all duration-200",
        {
          "h-[4rem] border-b border-neutral-300": sticky,
          "h-[6rem]": !sticky,
        }
      )}
    >
      <Container className="h-full flex items-center justify-between">
        <Nav />
        <Button
          className="md:hidden"
          variant="transparent"
          size="small"
          onClick={() => setIsNavOpen(true)}
          iconOnly
        >
          <Bars3BottomLeftIcon className="size-6" />
          <span className="sr-only">Open nav</span>
        </Button>
        <Logo />
        <Button
          className="relative"
          variant="transparent"
          onClick={() => setIsCartOpen(true)}
          iconOnly
        >
          <ShoppingCartIcon className="size-6" />
          <span className="sr-only">Open cart</span>
          {numItems > 0 && (
            <div
              className="absolute top-0 right-0 bg-rose-500 text-neutral-50 rounded-full aspect-square h-6 w-6"
              aria-live="polite"
              role="status"
            >
              {numItems} <span className="sr-only">cart items</span>
            </div>
          )}
        </Button>

        {/* Cart Drawer */}
        <Drawer
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          position="right"
        >
          <DrawerHeader>
            <DrawerTitle>Cart ({numItems})</DrawerTitle>
          </DrawerHeader>
          <DrawerContent>
            <CartList items={items} />
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
