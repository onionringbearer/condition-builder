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

const filterEmptyConditions = (conditions: ConditionsMap): ConditionsMap => {
  const validConditions: ConditionsMap = new Map();
  conditions.forEach((conditionGroup, key) => {
    const validGroup = conditionGroup.filter((condition) => !!condition.value);
    if (validGroup.length) {
      validConditions.set(key, validGroup);
    }
  });
  return validConditions;
};

export { filterDataset as default, filterEmptyConditions };
