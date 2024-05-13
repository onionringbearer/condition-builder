import Box from "@mui/material/Box";
import { Operators } from "@/types/operator";
import { ConditionType } from "@/types/condition";
import ConditionGroup from "@/components/condition-group";
import VerticalLine from "@/components/vertical-line";
import AndButton from "./and-button";
import Typography from "@mui/material/Typography";

import * as styles from "./styles";
import { useState } from "react";
import nextId from "react-id-generator";

export type ConditionsMap = Map<string, Array<ConditionType>>;
export interface ConditionBuilderProps {
  fields: string[];
  operators?: string[];
  onChange?: (conditions: ConditionsMap) => void;
}
const defaultOperators = Object.values(Operators);

const AndLabel = (): JSX.Element => (
  <Box sx={styles.andLabelBox}>
    <Typography variant="h6" color="grey" sx={styles.andLabelText}>
      AND
    </Typography>
  </Box>
);

const AndConnector = (): JSX.Element => (
  <>
    <AndLabel />
    <VerticalLine />
  </>
);

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

const ConditionBuilder = ({
  fields,
  operators = defaultOperators,
  onChange,
}: ConditionBuilderProps): JSX.Element => {
  const initialCondition = useInitialCondition(fields, operators);
  const [conditions, setConditions] = useState<ConditionsMap>(initialCondition);

  const handleConditionsChange = (conditions: ConditionsMap): void => {
    setConditions(conditions);
    onChange?.(conditions);
  };

  const handleGroupChange = (
    conditionGroup: Array<ConditionType>,
    groupKey: string
  ): void => {
    let newConditions: ConditionsMap;
    if (!conditionGroup.length) {
      newConditions = new Map(conditions);
      newConditions.delete(groupKey);
    } else {
      newConditions = new Map(conditions.set(groupKey, conditionGroup));
    }
    handleConditionsChange(newConditions);
  };

  const handleAdd = (): void => {
    const newGroupKey = nextId("group-");
    const newConditions = new Map(
      conditions.set(newGroupKey, [
        { id: nextId(), field: fields[0], operator: operators[0] },
      ])
    );
    handleConditionsChange(newConditions);
  };

  return (
    <>
      {[...conditions.keys()].map((key, index) => (
        <Box key={key}>
          {!!index && <AndConnector />}
          <ConditionGroup
            groupKey={key}
            fields={fields}
            operators={operators}
            conditions={conditions.get(key) || []}
            onChange={handleGroupChange}
          />
          <VerticalLine />
        </Box>
      ))}
      <AndButton onClick={handleAdd} />
    </>
  );
};

export default ConditionBuilder;
