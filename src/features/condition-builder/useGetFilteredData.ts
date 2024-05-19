import { Dataset } from "@/core/types/utility";
import { useEffect, useState } from "react";
import ConditionComparator from "@/lib/condition-builder/comparator";
import { ConditionsMap } from "@/core/types/condition";
import { DatasetFilter } from "@/core/types/filter";

const useGetFilteredData = (
  data: Dataset | null,
  conditions: ConditionsMap,
  datasetFilter: DatasetFilter
): { filteredData: Dataset } => {
  const [filteredData, setFilteredData] = useState<Dataset>(data || []);

  const getFilteredData = (): Dataset => {
    return datasetFilter(data || [], conditions, ConditionComparator);
  };

  useEffect(() => {
    if (conditions && data) {
      setFilteredData(getFilteredData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, conditions]);

  return { filteredData };
};

export default useGetFilteredData;
