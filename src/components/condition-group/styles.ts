import { SxProps } from "@mui/material/styles";

const flexColumnPaper: SxProps = {
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
};

const flexBox = {
  display: "flex",
  gap: "1rem",
};

const orBox: SxProps = {
  display: "flex",
  padding: "0 1rem",
};

const orText: SxProps = { fontWeight: 700, alignContent: "center" };

export { flexColumnPaper, flexBox, orBox, orText };
