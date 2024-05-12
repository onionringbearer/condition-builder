import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";

const style: SxProps = {
  borderLeft: "0.15rem solid #e1e1e1",
  height: "2.125rem",
  marginLeft: "2.5rem",
};

const VerticalLine = (): JSX.Element => {
  return <Box sx={style}></Box>;
};

export default VerticalLine;
