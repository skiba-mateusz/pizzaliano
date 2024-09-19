import { useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const getValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(`Error reading form LocalSorage: ${err}`);
    }
  };

  const [value, setValue] = useState<T>(getValue);

  const saveValue = (value: T) => {
    try {
      setValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error saving to LocalSorage: ${err}`);
    }
  };

  return [value, saveValue] as const;
};
