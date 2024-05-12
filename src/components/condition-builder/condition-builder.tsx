import Box from "@mui/material/Box";
import { Operators } from "@/types/operator";
import { ConditionType } from "@/types/condition";
import ConditionGroup from "@/components/condition-group";
import VerticalLine from "@/components/vertical-line";
import AndButton from "./and-button";
import Typography from "@mui/material/Typography";

import * as styles from "./styles";

export interface ConditionBuilderProps {
  fields?: string[];
  operators?: string[];
}

// Remove default fields
const defaultFields = ["name", "age"];
const defaultOperators = Object.values(Operators);

const conditions: Array<Array<ConditionType>> = [
  [
    { field: "name", operator: "Equals", value: "John" },
    { field: "age", operator: "Equals", value: "24" },
  ],
  [
    { field: "name", operator: "Equals", value: "John" },
    { field: "age", operator: "Equals", value: "24" },
  ],
];

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
}: ConditionBuilderProps): JSX.Element => {
  return (
    <>
      {conditions.map((conditionGroup, index) => (
        <Box>
          {!!index && <AndConnector />}
          <ConditionGroup
            key={index}
            fields={fields}
            operators={operators}
            conditions={conditionGroup}
          />
          <VerticalLine />
        </Box>
      ))}
      <AndButton />
    </>
  );
};

export default ConditionBuilder;
