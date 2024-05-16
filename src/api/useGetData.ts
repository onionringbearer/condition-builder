import { Dataset } from "@/core/types/utility";
import axios from "axios";
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
      const response = await axios.get<Dataset>(newUrl);
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error(error);
      setData([]);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData(url);
    } else {
      setIsError(false);
      setData([]);
    }
  }, [url]);

  return { data, isLoading, isError };
};

export default useGetData;
