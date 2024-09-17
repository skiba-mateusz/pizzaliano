import React, { useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
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
import { useCart } from "@/features/cart/contexts/CartContext";
import { CartList } from "@/features/cart/components/CartList";
import { Logo } from "../ui/logo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
];

interface NavItemProps {
  label: string;
  to: string;
  onNavLinkClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, to, onNavLinkClick }) => {
  return (
    <li key={label}>
      <NavLink
        to={to}
        onClick={onNavLinkClick}
        className="relative aria-[current]:text-rose-500"
      >
        {label}
      </NavLink>
    </li>
  );
};

interface NavProps {
  isMobile?: boolean;
  onNavLinkClick?: () => void;
}

const Nav: React.FC<NavProps> = ({ isMobile = false, onNavLinkClick }) => {
  return (
    <nav
      className={classNames({
        "hidden md:block": !isMobile,
      })}
      aria-label="Primary"
    >
      <ul
        className={classNames(
          {
            "grid text-lg text-center": isMobile,
            flex: !isMobile,
          },
          "gap-4"
        )}
      >
        {navLinks.map((navLink) => (
          <NavItem
            label={navLink.label}
            to={navLink.to}
            onNavLinkClick={onNavLinkClick}
          />
        ))}
      </ul>
    </nav>
  );
};

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  numItems: number;
  items: any[];
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  numItems,
  items,
}) => {
  return (
    <Drawer open={open} onClose={onClose} position="right">
      <DrawerHeader>
        <DrawerTitle>Cart ({numItems})</DrawerTitle>
      </DrawerHeader>
      <DrawerContent>
        <CartList items={items} />
      </DrawerContent>
      <DrawerFooter className="grid">
        <Button to="/cart" onClick={onClose}>
          Cart
        </Button>
        <Button className="mt-4" onClick={onClose} variant="outlined">
          Close
        </Button>
      </DrawerFooter>
    </Drawer>
  );
};

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
}

const NavDrawer: React.FC<NavDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose} position="left">
      <DrawerHeader>
        <DrawerTitle>Pizzaliano</DrawerTitle>
      </DrawerHeader>
      <DrawerContent>
        <Nav isMobile onNavLinkClick={onClose} />
      </DrawerContent>
    </Drawer>
  );
};

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
        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo />
        </div>
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
        <CartDrawer
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          numItems={numItems}
          items={items}
        />
        <NavDrawer open={isNavOpen} onClose={() => setIsNavOpen(false)} />
      </Container>
    </header>
  );
};
