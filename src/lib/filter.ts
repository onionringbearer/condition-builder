import { OperatorKeys } from "@/core/constants/operators";
import { Comparator } from "@/core/types/comparator";
import { ConditionsMap } from "@/core/types/condition";
import { Operators } from "@/core/types/operator";
import { Dataset } from "@/core/types/utility";

const filterDataset = (
  data: Dataset,
  conditions: ConditionsMap,
  comparator: Comparator
): Dataset => {
  let dataset = data || [];
  let result: Dataset = [];
  conditions.forEach((conditionGroup, key) => {
    result = [];
    conditionGroup.forEach((condition) => {
      const [matched, unmatched] = comparator.compare(
        OperatorKeys[condition.operator as Operators],
        condition,
        dataset
      );
      dataset = [...unmatched];
      result.push(...matched);
    });
    dataset = [...result];
  });
  return result;
};

export default filterDataset;
