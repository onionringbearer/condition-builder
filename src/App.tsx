import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import theme from "./theme";
import ConditionBuilder from "@/features/condition-builder";

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <main className="app">
        <header className="header">
          <h1>Condition Builder</h1>
        </header>
        <ConditionBuilder />
      </main>
    </ThemeProvider>
  );
};

export default App;
