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

export type Comparator = {
  /**
   * @returns `[matched, unmatched]` tuple where `matched` is the array of matched items
   * and `unmatched` is the array of items that did not match the condition.
   */
  compare: CompareFunction;
};
