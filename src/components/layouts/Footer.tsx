import React from "react";
import { Container } from "../ui/container";
import { Logo } from "../ui/logo";
import { Link } from "@/components/ui/link";
import { Image } from "../ui/image";

const Nav: React.FC = () => {
  return (
    <nav aria-label="footer">
      <ul className="flex gap-x-8 gap-y-2 flex-wrap text-nowrap">
        <li>
          <Link to="/" className="text-neutral-700">
            Privacy policy
          </Link>
        </li>
        <li>
          <Link to="/">Regulations</Link>
        </li>
        <li>
          <Link to="/">Contact</Link>
        </li>
        <li>
          <Link to="/">FAQ</Link>
        </li>
      </ul>
    </nav>
  );
};

const Socials: React.FC = () => {
  return (
    <div aria-label="Socials" className="flex gap-4">
      <Link to="https://instagram.com" target="blank">
        <Image
          src="/icons/instagram.svg"
          height={24}
          width={24}
          alt="Instagram"
        />
      </Link>
      <Link to="http://facebook.com" target="blank">
        <Image
          src="/icons/facebook.svg"
          height={24}
          width={24}
          alt="Facebook"
        />
      </Link>
    </div>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="mt-8 py-8 border-t border-neutral-300">
      <Container className="flex flex-col gap-4 items-center">
        <Logo />
        <Nav />
        <Socials />
        <p>&copy; 2024 Pizzaliano. All rights reserved.</p>
      </Container>
    </footer>
  );
};
