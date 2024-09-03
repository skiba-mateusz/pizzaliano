import React from "react";
import { Helmet } from "react-helmet";

interface HeadProps {
  title?: string;
  description?: string;
}

export const Head: React.FC<HeadProps> = ({ title, description }) => {
  return (
    <Helmet
      title={title ? `Pizzaliano | ${title}` : undefined}
      defaultTitle="Pizzaliano | Home"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
