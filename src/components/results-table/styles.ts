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
  ".MuiCircularProgress-root": {
    width: "6.25rem !important", // MUI adds inline width and height
    height: "6.25rem !important", // Need to override with !important
  },
};

export { tableContainer, boldHeader, chipsContainer, dataGrid };
