export enum Operators {
  Equals = "Equals",
  GreaterThan = "Greater Than",
  LessThan = "Less Than",
  Contains = "Contains",
  NotContains = "Not Contains",
  Regex = "Starts With",
}

export type Operator = keyof typeof Operators;
