import { XCircleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  mask?: string;
}

export const Input: React.FC<InputProps> = ({
  name = "",
  type = "text",
  label,
  mask = "",
  className,
  ...restProps
}) => {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();
  const { ref, ...rest } = register(name, {
    onBlur: () => {
      const value = getValues(name);
      if (!value && spanRef.current) {
        spanRef.current?.classList.add("top-1/2");
        spanRef.current?.classList.remove("top-0");
      }
    },
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const isError = Boolean(errors[name]);

  useEffect(() => {
    const value = getValues(name);
    if (value && spanRef.current) {
      spanRef.current?.classList.add("top-0");
    } else {
      if (document.activeElement !== inputRef?.current)
        spanRef.current?.classList.add("top-1/2");
    }
  }, [getValues, name, isError]);

  const props = {
    className: classNames(
      className,
      "w-full px-4 py-2 self-top rounded-md outline-none ring-2 transition-all duration-200 ",
      {
        "ring-rose-500": isError,
        "ring-neutral-300": !isError,
      }
    ),
    type,
    ...rest,
    ...restProps,
    label,
    "aria-invalid": isError,
  };

  const handleFocus = () => {
    spanRef.current?.classList.remove("top-1/2");
    spanRef.current?.classList.add("top-0");
  };

  return (
    <div>
      <label className="flex relative">
        {mask ? (
          <InputMask
            mask={mask}
            {...props}
            inputRef={(e: HTMLInputElement | null) => {
              ref(e);
              inputRef.current = e;
            }}
            defaultValue={getValues(name)}
            onFocus={handleFocus}
          />
        ) : (
          <input
            {...props}
            ref={(e: HTMLInputElement | null) => {
              ref(e);
              inputRef.current = e;
            }}
            onFocus={handleFocus}
          />
        )}
        <span
          ref={spanRef}
          className={classNames(
            "absolute left-4 px-1 bg-neutral-50 duration-100 -translate-y-1/2 select-none",
            {
              "text-rose-300": isError,
              "text-neutral-500": !isError,
            }
          )}
        >
          {label}
        </span>
      </label>
      {isError && (
        <p className="mt-1 flex gap-1 items-center text-rose-500" role="alert">
          <XCircleIcon className="size-6" />
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};
