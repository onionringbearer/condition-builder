export enum Operators {
  Equals = "Equals",
  GreaterThan = "Greater Than",
  LessThan = "Less Than",
  Contains = "Contains",
  NotContains = "Not Contains",
  Regex = "Regex",
}

export type Operator = Uncapitalize<keyof typeof Operators>;
