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
    console.log(field, value, data);
    return ArrayUtils.filter(
      data,
      (row) =>
        row[field]?.toString().toLowerCase() === value.toString().toLowerCase()
    );
  },

  greaterThan: (
    field: string,
    value: Primitive,
    data: Dataset
  ): [Dataset, Dataset] => {
    return ArrayUtils.filter(
      data,
      (row) =>
        !!row[field] &&
        parseInt(row[field].toString()) > parseInt(value.toString())
    );
  },

  lessThan: (
    field: string,
    value: Primitive,
    data: Dataset
  ): [Dataset, Dataset] => {
    return ArrayUtils.filter(
      data,
      (row) =>
        !!row[field] &&
        parseInt(row[field].toString()) < parseInt(value.toString())
    );
  },

  contains: (
    field: string,
    value: Primitive,
    data: Dataset
  ): [Dataset, Dataset] => {
    return ArrayUtils.filter(data, (row) =>
      row[field]
        ?.toString()
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
          ?.toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase())
    );
  },

  regex: (
    field: string,
    value: Primitive,
    data: Dataset
  ): [Dataset, Dataset] => {
    let success = true;
    let result: [Dataset, Dataset] = [[], []];
    try {
      const regex = new RegExp(value.toString(), "i");
      result = ArrayUtils.filter(data, (row) =>
        regex.test(row[field]?.toString())
      );
    } catch (error) {
      success = false;
      console.error(
        "Malformed regular expression. Waiting for user input to change the expression. Regex: ",
        value
      );
    }
    return success ? result : [[], data];
  },
};

const ConditionComparator: Comparator = { compare };

export default ConditionComparator;
