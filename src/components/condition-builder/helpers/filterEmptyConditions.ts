import { ConditionsMap } from "@/core/types/condition";

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

export default filterEmptyConditions;
