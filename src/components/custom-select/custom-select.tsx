import MenuItem from "@mui/material/MenuItem";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { forwardRef } from "react";

type CustomSelectProps = TextFieldProps & {
  options: string[];
  label: string | undefined;
  fullWidth: boolean;
  onSelectionChange: (value: string) => void;
};

const CustomSelect = forwardRef(
  (
    {
      options = [],
      label = "",
      fullWidth,
      value,
      onSelectionChange,
      ...rest
    }: Partial<CustomSelectProps>,
    ref: React.Ref<HTMLInputElement>
  ): JSX.Element => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onSelectionChange?.(event.target.value);
    };

    return (
      <TextField
        select
        label={label}
        value={value}
        fullWidth={fullWidth}
        onChange={handleChange}
        inputRef={ref}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    );
  }
);

export default CustomSelect;
