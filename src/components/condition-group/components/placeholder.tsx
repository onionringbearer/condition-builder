import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const FadeOutBox = styled(Box)`
  animation-name: fadeOut;
  animation-duration: 1.25s;
  animation-iteration-count: infinite;

  @keyframes fadeOut {
    0% {
      opacity: 0.5;
    }
    25% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.3;
    }
    75% {
      opacity: 0.2;
    }
    100% {
      opacity: 0.1;
    }
  }
`;

const Placeholder = (): JSX.Element => {
  return (
    <FadeOutBox
      sx={{
        height: "3.5rem",
        backgroundColor: "grey",
        opacity: 0.5,
      }}
    ></FadeOutBox>
  );
};

export default Placeholder;
