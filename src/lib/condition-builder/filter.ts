import { OperatorKeys, Operators } from "@/core/constants/operators";
import { Comparator } from "@/core/types/comparator";
import { ConditionsMap } from "@/core/types/condition";
import { DatasetFilter } from "@/core/types/filter";
import { Dataset } from "@/core/types/utility";

const datasetFilter: DatasetFilter = (
  data: Dataset,
  conditions: ConditionsMap,
  comparator: Comparator
): Dataset => {
  let dataset = data || [];
  let result: Dataset = [];
  conditions.forEach((conditionGroup) => {
    result = [];
    conditionGroup.forEach((condition) => {
      if (condition.value) {
        const [matched, unmatched] = comparator.compare(
          OperatorKeys[condition.operator as Operators],
          condition,
          dataset
        );
        dataset = [...unmatched];
        result.push(...matched);
      }
    });
    dataset = [...result];
  });
  return conditions.size ? result : data;
};

export default datasetFilter;
