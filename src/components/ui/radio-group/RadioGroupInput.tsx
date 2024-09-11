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
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    onChange(value);
    if (customOnChange) {
      customOnChange(value);
    }
  };

  return (
    <div className="flex-1">
      <input
        className="peer sr-only"
        id={id}
        type="radio"
        checked={value === selectedValue}
        value={value}
        tabIndex={value === selectedValue ? 0 : -1}
        onChange={handleChange}
      />
      <label
        className={classNames(
          "p-[.6em_1.2em] block text-center border border-rose-500 rounded-md cursor-pointer outline-none ring-offset-1 ring-rose-300 transition-all peer-focus:ring",
          {
            "bg-rose-500 text-neutral-50": value === selectedValue,
            "hover:bg-rose-50": value !== selectedValue,
          }
        )}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  );
};
