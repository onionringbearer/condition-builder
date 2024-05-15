import { Dataset } from "@/core/types/utility";
import { useCallback, useEffect, useState } from "react";
import filterDataset from "@/lib/condition-builder/filter";
import ConditionComparator from "@/lib/condition-builder/comparator";
import { ConditionsMap } from "@/core/types/condition";

const useGetFilteredData = (
  data: Dataset | null,
  conditions: ConditionsMap
): { filteredData: Dataset } => {
  const [filteredData, setFilteredData] = useState<Dataset>(data || []);

  const getFilteredData = useCallback((): Dataset => {
    return filterDataset(data || [], conditions, ConditionComparator);
  }, [data, conditions]);

  useEffect(() => {
    if (conditions && data) {
      setFilteredData(getFilteredData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, conditions]);

  return { filteredData };
};

export default useGetFilteredData;
