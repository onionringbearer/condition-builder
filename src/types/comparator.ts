import { ConditionType } from "./condition";
import { Operator } from "./operator";
import { Dataset, Primitive } from "./utility";

export type ComparisonFunctions<T extends Operator = Operator> = {
  [key in T]: (
    field: string,
    value: Primitive,
    data: Dataset
  ) => [Dataset, Dataset];
};

export type CompareFunction = (
  comparator: Operator,
  condition: ConditionType,
  data: Dataset
) => [Dataset, Dataset];

export type Comparator = { compare: CompareFunction };
