import React from "react";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import {
  RadioGroup,
  RadioGroupInput,
  RadioGroupLabel,
} from "@/components/ui/radio-group";

import { Container } from "@/components/ui/container";
import { useSticky } from "@/hooks/useSticky";
import { Category } from "../types";

interface MenuCategoriesProps {
  categories: Category[];
}

export const MenuCategories: React.FC<MenuCategoriesProps> = ({
  categories,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ref, sticky] = useSticky<HTMLDivElement>(64);
  console.log(sticky, ref);

  const defaultCategory = searchParams.get("category") || undefined;

  return (
    <div
      ref={ref}
      className={classNames(
        "p-4",
        sticky
          ? "sticky top-[4rem] bg-neutral-50 shadow-md"
          : "static shadow-none"
      )}
    >
      <Container variant="narrow">
        <RadioGroup defaultValue={defaultCategory}>
          <RadioGroupLabel>Select category</RadioGroupLabel>
          {categories.map((category) => (
            <RadioGroupInput
              key={category.value}
              onChange={(value) => setSearchParams({ category: value })}
              value={category.value}
            >
              {category.label}
            </RadioGroupInput>
          ))}
        </RadioGroup>
      </Container>
    </div>
  );
};
