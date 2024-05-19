import Box from "@mui/material/Box";
import { Operators } from "@/core/types/operator";
import {
  ConditionType,
  ConditionsMap,
  ValidatorFunction,
} from "@/core/types/condition";
import ConditionGroup from "@/components/condition-group";
import VerticalLine from "@/components/vertical-line";
import AndButton from "./components/and-button";
import Typography from "@mui/material/Typography";

import * as styles from "./styles";
import { useState } from "react";
import nextId from "react-id-generator";
import useInitialCondition from "./useInitialCondition";
import filterEmptyConditions from "./helpers/filterEmptyConditions";

export interface ConditionBuilderProps {
  fields: string[];
  operators?: string[];
  /**
   * A function that validates the condition passed. If the condition is invalid,
   * the function should return a tuple with the first element as `false`
   * and the second element as the error message.
   *
   * @type `ValidatorFunction = (condition: ConditionType) => [valid: boolean, message: string]`
   */
  validator?: ValidatorFunction;
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

const ConditionBuilder = ({
  fields,
  operators = defaultOperators,
  validator,
  onChange,
}: ConditionBuilderProps): JSX.Element => {
  const initialCondition = useInitialCondition(fields, operators);
  const [conditions, setConditions] = useState<ConditionsMap>(initialCondition);

  const handleConditionsChange = (conditions: ConditionsMap): void => {
    setConditions(conditions);
    const validConditions = filterEmptyConditions(conditions);
    onChange?.(validConditions);
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
            validator={validator}
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
