import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import * as styles from "./styles";
import Box from "@mui/material/Box";

type ActionButtonsProps = {
  index: number;
  onAdd?: (index: number) => void;
  onDelete?: (index: number) => void;
};

// This component could be further abstracted for full reusability,
// but that is unnecessary overhead for our purposes.
const ActionButtons = ({
  index,
  onAdd,
  onDelete,
}: ActionButtonsProps): JSX.Element => {
  const handleAddClick = (): void => {
    onAdd?.(index);
  };

  const handleDeleteClick = (): void => {
    onDelete?.(index);
  };
  return (
    <Box sx={styles.actionButtons}>
      <IconButton onClick={handleAddClick} color="primary">
        <AddIcon />
      </IconButton>
      <IconButton onClick={handleDeleteClick} color="warning">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default ActionButtons;
