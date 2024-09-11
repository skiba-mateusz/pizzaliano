import React from "react";
import { Link } from "react-router-dom";

export const Logo: React.FC = () => {
  return (
    <Link
      to="/"
      className="font-heading tracking-wide text-rose-500 font-bold text-3xl"
    >
      Pizzaliano
    </Link>
  );
};
