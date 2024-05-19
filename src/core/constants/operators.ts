import { Operator } from "@/core/types/operator";

export enum Operators {
  Equals = "Equals",
  GreaterThan = "Greater Than",
  LessThan = "Less Than",
  Contains = "Contains",
  NotContains = "Not Contains",
  Regex = "Regex",
}

const OperatorKeys: { [key in Operators]: Operator } = {
  [Operators.Equals]: "equals",
  [Operators.GreaterThan]: "greaterThan",
  [Operators.LessThan]: "lessThan",
  [Operators.Contains]: "contains",
  [Operators.NotContains]: "notContains",
  [Operators.Regex]: "regex",
};

export { OperatorKeys };
