import { ConditionType, ValidatorFunction } from "@/core/types/condition";
import { Operators } from "@/core/types/operator";

const numericFieldMessage = "Please enter a valid number for better results.";

const validate: ValidatorFunction = (
  condition: ConditionType
): [boolean, string] => {
  let valid = true;
  let message = "";
  if (
    condition.value &&
    (condition.operator === Operators.GreaterThan ||
      condition.operator === Operators.LessThan)
  ) {
    valid = !isNaN(parseInt(condition.value || ""));
    message = !valid ? numericFieldMessage : "";
  }
  return [valid, message];
};

export default validate;
