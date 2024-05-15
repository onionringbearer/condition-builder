import { Dataset } from "@/types/utility";
import { useCallback, useEffect, useState } from "react";
import filterDataset from "../features/condition-builder/filter";
import ConditionComparator from "../features/condition-builder/comparator";
import { ConditionsMap } from "@/types/condition";

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
