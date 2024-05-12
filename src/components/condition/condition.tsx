import CustomSelect from "@/components/custom-select";
import { ConditionType } from "@/types/condition";
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { conditionBox } from "./styles";

type ConditionInputsConfig = {
  fieldLabel: string;
  operatorLabel: string;
  valueLabel: string;
};

interface ConditionProps {
  fields: string[];
  operators: string[];
  selectedField: string;
  selectedOperator: string;
  value: string;
  config: Partial<ConditionInputsConfig>;
  onChange: (condition: ConditionType) => void;
}

const defaultConfig: ConditionInputsConfig = {
  fieldLabel: "Left Condition",
  operatorLabel: "Operator",
  valueLabel: "Value",
};

const Condition = ({
  fields = [],
  operators = [],
  // Maybe better an initialValue: ConditionType or something similar.
  // TODO: refactor
  selectedField,
  selectedOperator,
  value = "",
  config = { ...defaultConfig },
  onChange,
}: Partial<ConditionProps>): JSX.Element => {
  const [condition, setCondition] = useState<ConditionType>({
    field: selectedField || fields[0] || "",
    operator: selectedOperator || operators[0] || "",
    value: value,
  });
  const fieldRef = useRef<HTMLInputElement>(null);
  const operatorRef = useRef<HTMLInputElement>(null);

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newCondition: ConditionType = {
      field: fieldRef.current?.value || condition.field,
      operator: operatorRef.current?.value || condition.operator,
      value: event.target.value,
    };
    setCondition(newCondition);
    onChange?.(newCondition);
  };

  return (
    <Box sx={conditionBox}>
      <CustomSelect
        options={fields}
        label={config.fieldLabel}
        value={condition.field}
        ref={fieldRef}
      />
      <CustomSelect
        options={operators}
        label={config.operatorLabel}
        value={condition.operator}
        ref={operatorRef}
      />
      <TextField
        label={config.valueLabel}
        value={condition.value}
        onChange={handleValueChange}
      />
    </Box>
  );
};

export default Condition;
