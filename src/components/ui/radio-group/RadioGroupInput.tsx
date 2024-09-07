import { useId } from "react";
import classNames from "classnames";
import { useRadioGroup } from "./RadioGroupContext";

interface RadioGroupInputProps extends React.PropsWithChildren {
  value: string;
  onChange?: (value: string) => void;
}

export const RadioGroupInput: React.FC<RadioGroupInputProps> = ({
  value,
  onChange: customOnChange,
  children,
}) => {
  const { selectedValue, onChange } = useRadioGroup();
  const id = useId();

  const handleChange = () => {
    onChange(value);
    if (customOnChange) {
      customOnChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleChange();
    }
  };

  return (
    <div className="flex-1">
      <input
        className="sr-only"
        id={id}
        type="radio"
        checked={value === selectedValue}
        value={value}
        onChange={handleChange}
      />
      <label
        tabIndex={0}
        className={classNames(
          "p-[.6em_1.2em] block text-center border border-rose-500 rounded-md cursor-pointer outline-none ring-offset ring-rose-300 transition-all  focus:ring",
          {
            "bg-rose-500 text-neutral-50": value === selectedValue,
            "hover:bg-rose-50": value !== selectedValue,
          }
        )}
        htmlFor={id}
        onKeyDown={handleKeyDown}
      >
        {children}
      </label>
    </div>
  );
};
