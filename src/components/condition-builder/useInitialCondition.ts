import { ConditionsMap } from "@/core/types/condition";
import nextId from "react-id-generator";

const useInitialCondition = (
  fields: string[],
  operators: string[]
): ConditionsMap => {
  return new Map([
    [
      nextId("group-"),
      [{ id: nextId(), field: fields[0] || "", operator: operators[0] || "" }],
    ],
  ]);
};

export default useInitialCondition;
