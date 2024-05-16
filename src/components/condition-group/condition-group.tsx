import { ConditionType } from "@/core/types/condition";
import { ConditionBuilderProps } from "@/components/condition-builder";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Condition from "@/components/condition";
import Typography from "@mui/material/Typography";
import ActionButtons from "./components/action-buttons";
import { Fragment, useState } from "react";
import nextId from "react-id-generator";
import Placeholder from "./components/placeholder";
import * as styles from "./styles";

type ConditionGroupProps = Pick<
  ConditionBuilderProps,
  "fields" | "operators" | "validator"
> & {
  conditions: Array<ConditionType>;
  groupKey: string;
  onChange?: (conditions: Array<ConditionType>, groupKey: string) => void;
};

const OrLabel = (): JSX.Element => (
  <Box sx={styles.orBox}>
    <Typography variant="h6" color="primary" sx={styles.orText}>
      OR
    </Typography>
  </Box>
);

const ConditionGroup = ({
  groupKey,
  fields,
  operators,
  conditions,
  validator,
  onChange,
}: ConditionGroupProps): JSX.Element => {
  const [conditionGroup, setConditionGroup] =
    useState<Array<ConditionType>>(conditions);
  const [placeholderAt, setPlaceholderAt] = useState<number>(-1);

  const handleGroupChange = (conditionGroup: Array<ConditionType>): void => {
    setConditionGroup(conditionGroup);
    onChange?.(conditionGroup, groupKey);
  };

  const handleGoingToAdd = (index: number): void => {
    setPlaceholderAt(index);
  };

  const handleAdd = (index: number): void => {
    setPlaceholderAt(-1);
    const newConditionGroup = [...conditionGroup];
    newConditionGroup.splice(index + 1, 0, {
      id: nextId(),
      field: fields?.[0] || "",
      operator: operators?.[0] || "",
    });
    handleGroupChange(newConditionGroup);
  };

  const handleDelete = (index: number): void => {
    const newConditionGroup = [...conditionGroup];
    newConditionGroup.splice(index, 1);
    handleGroupChange(newConditionGroup);
  };

  const handleValueChange = (condition: ConditionType, index: number) => {
    const newConditions = [...conditionGroup];
    newConditions.splice(index, 1, condition);
    handleGroupChange(newConditions);
  };

  return (
    <Paper elevation={1} sx={styles.flexColumnPaper}>
      {conditionGroup.map((condition, index) => (
        <Fragment key={condition.id}>
          <Box sx={styles.flexBox}>
            {!!index && <OrLabel />}
            <Condition
              index={index}
              fields={fields}
              operators={operators}
              initialCondition={condition}
              validator={validator}
              onChange={handleValueChange}
            />
            <ActionButtons
              forIndex={index}
              onGoingToAdd={handleGoingToAdd}
              onAdd={handleAdd}
              onDelete={handleDelete}
            />
          </Box>
          {index === placeholderAt && <Placeholder />}
        </Fragment>
      ))}
    </Paper>
  );
};

export default ConditionGroup;
