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
import { useCategories } from "../api/getCategories";

export const MenuCategories: React.FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  const { categories } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  const [ref, sticky] = useSticky<HTMLDivElement>(64);

  const defaultCategory = searchParams.get("category") || "";

  if (isLoading) return null;

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
              key={category.slug}
              onChange={(value) => setSearchParams({ category: value })}
              value={category.slug}
            >
              {category.name}
            </RadioGroupInput>
          ))}
        </RadioGroup>
      </Container>
    </div>
  );
};
