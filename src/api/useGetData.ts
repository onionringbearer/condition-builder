import { Dataset } from "@/types/utility";
import { useEffect, useState } from "react";

type UseGetDataReturnType = {
  data: Dataset | null;
  isLoading: boolean;
  isError: boolean;
};

const useGetData = (url: string): UseGetDataReturnType => {
  const [data, setData] = useState<Dataset | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchData = async (newUrl: string): Promise<void> => {
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await fetch(newUrl);
      const data = await response.json();
      setData(data);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (url) {
      fetchData(url);
    } else {
      setData(null);
    }
  }, [url]);

  return { data, isLoading, isError };
};

export default useGetData;
