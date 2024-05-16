import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";

const actionButtons: SxProps = {
  display: "flex",
  "& .MuiIconButton-root": { padding: "0.5rem 0.75rem" },
};

type ActionButtonsProps = {
  forIndex: number;
  onGoingToAdd?: (index: number) => void;
  onAdd?: (index: number) => void;
  onDelete?: (index: number) => void;
};

// This component could be further abstracted for full reusability,
// but that is unnecessary overhead for our purposes.
const ActionButtons = ({
  forIndex,
  onGoingToAdd,
  onAdd,
  onDelete,
}: ActionButtonsProps): JSX.Element => {
  const handleGoingToAdd = (): void => {
    onGoingToAdd?.(forIndex);
  };

  const handleFinishAdding = (): void => {
    onGoingToAdd?.(-1);
  };

  const handleAddClick = (): void => {
    onAdd?.(forIndex);
  };

  const handleDeleteClick = (): void => {
    onDelete?.(forIndex);
  };
  return (
    <Box sx={actionButtons}>
      <IconButton
        onClick={handleAddClick}
        onMouseEnter={handleGoingToAdd}
        onMouseLeave={handleFinishAdding}
        color="primary"
      >
        <AddIcon />
      </IconButton>
      <IconButton onClick={handleDeleteClick} color="warning">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default ActionButtons;
