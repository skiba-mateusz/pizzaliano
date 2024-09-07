import { useEffect, useRef, useState } from "react";

export const useSticky = <T extends HTMLElement>(offset: number = 0) => {
  const stickyRef = useRef<T>(null);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = stickyRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isSticky = rect.top - offset <= 0 && window.scrollY > 0;

      setSticky(isSticky);
    };

    document.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  return [stickyRef, sticky] as const;
};
