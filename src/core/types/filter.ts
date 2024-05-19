import { Comparator } from "./comparator";
import { ConditionsMap } from "./condition";
import { Dataset } from "./utility";

export type DatasetFilter = (
  data: Dataset,
  conditions: ConditionsMap,
  comparator: Comparator
) => Dataset;
