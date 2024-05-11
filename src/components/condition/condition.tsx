import CustomSelect from "@/components/custom-select";
import { ConditionType } from "@/types/condition";
import { TextField } from "@mui/material";
import { useRef, useState } from "react";
import { ConditionBox } from "./styled";

type ConditionInputsConfig = {
  fieldLabel: string;
  operatorLabel: string;
  valueLabel: string;
};

interface ConditionProps {
  fields: string[];
  operators: string[];
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
  value = "",
  config = { ...defaultConfig },
  onChange,
}: Partial<ConditionProps>): JSX.Element => {
  const [condition, setCondition] = useState<ConditionType>({
    field: fields[0],
    operator: operators[0],
    value: value,
  });
  const fieldRef = useRef<HTMLInputElement>(null);
  const operatorRef = useRef<HTMLInputElement>(null);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCondition: ConditionType = {
      field: fieldRef.current?.value || condition.field,
      operator: operatorRef.current?.value || condition.operator,
      value: event.target.value,
    };
    setCondition(newCondition);
    onChange?.(newCondition);
  };

  return (
    <ConditionBox>
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
    </ConditionBox>
  );
};

export default Condition;
