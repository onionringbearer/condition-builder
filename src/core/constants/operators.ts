import { Operator, Operators } from "@/core/types/operator";

const OperatorKeys: { [key in Operators]: Operator } = {
  [Operators.Equals]: "equals",
  [Operators.GreaterThan]: "greaterThan",
  [Operators.LessThan]: "lessThan",
  [Operators.Contains]: "contains",
  [Operators.NotContains]: "notContains",
  [Operators.Regex]: "regex",
};

export { OperatorKeys };
