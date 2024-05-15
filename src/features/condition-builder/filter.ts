import { OperatorKeys } from "@/constants/operators";
import { Comparator } from "@/types/comparator";
import { ConditionsMap } from "@/types/condition";
import { Operators } from "@/types/operator";
import { Dataset } from "@/types/utility";

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
