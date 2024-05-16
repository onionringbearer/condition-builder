import CustomSelect from "@/components/custom-select";
import { ConditionType, ValidatorFunction } from "@/core/types/condition";
import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { conditionBox } from "./styles";

export type ConditionInputsConfig = {
  fieldLabel: string;
  operatorLabel: string;
  valueLabel: string;
};

interface ConditionProps {
  index: number;
  initialCondition: ConditionType;
  fields?: string[];
  operators?: string[];
  config?: Partial<ConditionInputsConfig>;
  validator?: ValidatorFunction;
  onChange?: (condition: ConditionType, index: number) => void;
}

const defaultConfig: ConditionInputsConfig = {
  fieldLabel: "Left Condition",
  operatorLabel: "Operator",
  valueLabel: "Value",
};

const Condition = ({
  index,
  fields = [],
  operators = [],
  initialCondition,
  config = { ...defaultConfig },
  validator: validate,
  onChange,
}: ConditionProps): JSX.Element => {
  const [condition, setCondition] = useState<ConditionType>(initialCondition);

  const [isValid, helperText] = useMemo(() => {
    return validate ? validate(condition) : [true, ""];
  }, [condition, validate]);

  const handleConditionChange = (newCondition: ConditionType): void => {
    setCondition(newCondition);
    onChange?.(newCondition, index);
  };

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    handleConditionChange({ ...condition, value });
  };

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const field = event.target.value;
    handleConditionChange({ ...condition, field });
  };

  const handleOperatorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const operator = event.target.value;
    handleConditionChange({ ...condition, operator });
  };

  return (
    <Box sx={conditionBox}>
      <CustomSelect
        options={fields}
        label={config.fieldLabel}
        value={condition.field}
        onChange={handleFieldChange}
      />
      <CustomSelect
        options={operators}
        label={config.operatorLabel}
        value={condition.operator}
        onChange={handleOperatorChange}
      />
      <TextField
        label={config.valueLabel}
        value={condition.value || ""}
        helperText={helperText}
        error={!isValid}
        onChange={handleValueChange}
      />
    </Box>
  );
};

export default Condition;
