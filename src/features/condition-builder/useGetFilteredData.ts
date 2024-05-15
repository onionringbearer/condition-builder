import { Dataset } from "@/core/types/utility";
import { useCallback, useEffect, useState } from "react";
import filterDataset from "@/lib/filter";
import ConditionComparator from "@/lib/comparator";
import { ConditionsMap } from "@/core/types/condition";

const useGetFilteredData = (
  data: Dataset | null,
  conditions: ConditionsMap
): { filteredData: Dataset } => {
  const [filteredData, setFilteredData] = useState<Dataset>([]);

  const getFilteredData = useCallback((): Dataset => {
    return filterDataset(data || [], conditions, ConditionComparator);
  }, [data, conditions]);

  useEffect(() => {
    if (conditions && data) {
      setFilteredData(getFilteredData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditions]);

  return { filteredData };
};

export default useGetFilteredData;
