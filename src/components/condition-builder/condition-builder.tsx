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

type Conditions = Map<string, Array<ConditionType>>;
export interface ConditionBuilderProps {
  fields?: string[];
  operators?: string[];
  onChange?: (conditions: Conditions) => void;
}

// Remove default fields
const defaultFields = ["name", "age"];
const defaultOperators = Object.values(Operators);

const mockConditions: Conditions = new Map([
  [
    nextId("group-"),
    [
      { id: nextId(), field: "name", operator: "Equals" },
      { id: nextId(), field: "name", operator: "Equals" },
    ],
  ],
  [
    nextId("group-"),
    [
      { id: nextId(), field: "name", operator: "Equals" },
      { id: nextId(), field: "name", operator: "Equals" },
    ],
  ],
]);

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

const ConditionBuilder = ({
  fields = defaultFields,
  operators = defaultOperators,
  onChange,
}: ConditionBuilderProps): JSX.Element => {
  const [conditions, setConditions] = useState<Conditions>(mockConditions);

  const handleGroupChange = (
    conditionGroup: Array<ConditionType>,
    groupKey: string
  ): void => {
    if (!conditionGroup.length) {
      const newConditions = new Map(conditions);
      newConditions.delete(groupKey);
      setConditions(newConditions);
    } else {
      setConditions(new Map(conditions.set(groupKey, conditionGroup)));
    }
    onChange?.(conditions);
  };

  const handleAdd = (): void => {
    const newGroupKey = nextId("group-");
    setConditions(
      new Map(
        conditions.set(newGroupKey, [
          { id: nextId(), field: fields[0], operator: operators[0] },
        ])
      )
    );
    onChange?.(conditions);
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
