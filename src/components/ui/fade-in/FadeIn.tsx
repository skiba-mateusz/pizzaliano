import classNames from "classnames";
import React, { createElement, useEffect, useRef, useState } from "react";

interface FadeInProps extends React.PropsWithChildren {
  duration?: number;
  as?: string;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className,
  as = "div",
  duration = 500,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0,
      }
    );

    const element = ref.current;

    if (!element) return;

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  console.log(isVisible);

  return createElement(
    as,
    {
      ref,
      style: { transition: `${duration}ms` },
      className: classNames(
        {
          "translate-y-[2rem] opacity-0": !isVisible,
          "": isVisible,
        },
        className
      ),
    },
    children
  );
};
