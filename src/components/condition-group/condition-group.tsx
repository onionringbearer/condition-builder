import { ConditionType } from "@/types/condition";
import { ConditionBuilderProps } from "@/components/condition-builder";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Condition from "@/components/condition";

import * as styles from "./styles";
import Typography from "@mui/material/Typography";
import ActionButtons from "./action-buttons";

type ConditionGroupProps = Pick<
  ConditionBuilderProps,
  "fields" | "operators"
> & {
  conditions: Array<ConditionType>;
};

const OrLabel = (): JSX.Element => (
  <Box sx={styles.orBox}>
    <Typography variant="h6" color="primary" sx={styles.orText}>
      OR
    </Typography>
  </Box>
);

const ConditionGroup = ({
  fields,
  operators,
  conditions,
}: ConditionGroupProps): JSX.Element => {
  return (
    <Paper elevation={1} sx={styles.flexColumnPaper}>
      {conditions.map((condition, index) => (
        <Box key={index} sx={styles.flexBox}>
          {!!index && <OrLabel />}
          <Condition
            fields={fields}
            operators={operators}
            selectedField={condition.field}
            selectedOperator={condition.operator}
            onChange={(condition) => console.log(condition)}
          />
          <ActionButtons index={index} />
        </Box>
      ))}
    </Paper>
  );
};

export default ConditionGroup;
