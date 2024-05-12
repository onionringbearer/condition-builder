import Button, { ButtonProps } from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { SxProps } from "@mui/material/styles";

const andButton: SxProps = {
  padding: "0.4rem 0.6rem",
  fontWeight: 600,
};

const AndButton = ({ ...rest }: ButtonProps): JSX.Element => {
  return (
    <Button
      variant="outlined"
      color="primary"
      size="large"
      startIcon={<AddIcon />}
      sx={andButton}
      {...rest}
    >
      AND
    </Button>
  );
};

export default AndButton;
