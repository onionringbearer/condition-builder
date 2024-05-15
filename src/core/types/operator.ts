export enum Operators {
  Equals = "Equals",
  GreaterThan = "Greater Than",
  LessThan = "Less Than",
  Contains = "Contains",
  NotContains = "Not Contains",
  Regex = "Regex",
}

export enum MyOperators {
  Equals = "Equals",
  GreaterThan = "Greater Than",
  LessThan = "Less Than",
  Contains = "Contains",
  NotContains = "Not Contains",
  Regex = "Regex",
  LongerThan = "Longer Than",
}

export type Operator = Uncapitalize<keyof typeof Operators>;
