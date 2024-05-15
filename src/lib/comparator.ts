import { ConditionType } from "@/core/types/condition";
import {
  Comparator,
  CompareFunction,
  ComparisonFunctions,
} from "@/core/types/comparator";
import { Dataset, Primitive } from "@/core/types/utility";
import ArrayUtils from "@/lib/utils/arrays";
import { Operator } from "@/core/types/operator";

const compare: CompareFunction = (
  comparator: Operator,
  condition: ConditionType,
  data: Dataset
): [Dataset, Dataset] => {
  return comparisonFunctions[comparator](
    condition.field,
    condition.value || "",
    data
  );
};

const comparisonFunctions: ComparisonFunctions = {
  equals: (
    field: string,
    value: Primitive,
    data: Dataset
  ): [Dataset, Dataset] => {
    return ArrayUtils.filter(
      data,
      (row) =>
        row[field].toString().toLowerCase() === value.toString().toLowerCase()
    );
  },

  greaterThan: (
    field: string,
    value: Primitive,
    data: Dataset
  ): [Dataset, Dataset] => {
    return ArrayUtils.filter(data, (row) => row[field] > value);
  },

  lessThan: (
    field: string,
    value: Primitive,
    data: Dataset
  ): [Dataset, Dataset] => {
    return ArrayUtils.filter(data, (row) => row[field] < value);
  },

  contains: (
    field: string,
    value: Primitive,
    data: Dataset
  ): [Dataset, Dataset] => {
    return ArrayUtils.filter(data, (row) =>
      row[field]
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase())
    );
  },

  notContains: (
    field: string,
    value: Primitive,
    data: Dataset
  ): [Dataset, Dataset] => {
    return ArrayUtils.filter(
      data,
      (row) =>
        !row[field]
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase())
    );
  },

  regex: (
    field: string,
    value: Primitive,
    data: Dataset
  ): [Dataset, Dataset] => {
    const regex = new RegExp(value.toString());
    return ArrayUtils.filter(data, (row) => regex.test(row[field].toString()));
  },
};

const ConditionComparator: Comparator = { compare };

export default ConditionComparator;
