import { useEffect, useState } from "react";

export const useFetch = <T>(resource: T, delay: number = 500) => {
  const [data, setData] = useState<T>(
    Array.isArray(resource) ? ([] as T) : ({} as T)
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    new Promise<T>((resolve) => {
      setTimeout(() => {
        resolve(resource);
      }, delay);
    })
      .then((data: T) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch data");
      })
      .finally(() => setIsLoading(false));
  }, [resource, delay]);

  return { data, isLoading, error };
};
