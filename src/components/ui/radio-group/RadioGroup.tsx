import React from "react";
import { RadioGroupProvider } from "./RadioGroupContext";

interface RadioGroupProps extends React.PropsWithChildren {
  defaultValue?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  defaultValue = "",
  children,
}) => {
  return (
    <RadioGroupProvider defaultValue={defaultValue}>
      <fieldset>
        <div className="flex justify-center gap-2 flex-wrap md:gap-4">
          {children}
        </div>
      </fieldset>
    </RadioGroupProvider>
  );
};
