import { createContext, useContext, useState } from "react";

interface RadioGroupContextProps {
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextProps | undefined>(
  undefined
);

interface RadioGroupProviderProps extends React.PropsWithChildren {
  defaultValue?: string;
}

const RadioGroupProvider: React.FC<RadioGroupProviderProps> = ({
  defaultValue = "",
  children,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  return (
    <RadioGroupContext.Provider
      value={{ selectedValue, onChange: (value) => setSelectedValue(value) }}
    >
      {children}
    </RadioGroupContext.Provider>
  );
};

const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error("useRadioGroup used outside its provider");
  }
  return context;
};

export { RadioGroupProvider, useRadioGroup };
