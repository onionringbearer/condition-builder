import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import ConditionBuilder from "@/components/condition-builder";
import theme from "./theme";

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <main className="app">
        <header className="header">
          <h1>Condition Builder</h1>
        </header>
        <ConditionBuilder onChange={console.log} />
      </main>
    </ThemeProvider>
  );
};

export default App;
