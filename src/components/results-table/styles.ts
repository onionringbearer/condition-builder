import { SxProps } from "@mui/material/styles";

const tableContainer: SxProps = { height: 600, marginTop: "2.5rem" };

const boldHeader: SxProps = { fontWeight: 700 };

const chipsContainer: SxProps = {
  display: "flex",
  gap: "1rem",
  margin: "0.75rem 0 1.5rem 0",
};

const dataGrid: SxProps = {
  ".MuiDataGrid-columnSeparator": { visibility: "visible" },
};

export { tableContainer, boldHeader, chipsContainer, dataGrid };
