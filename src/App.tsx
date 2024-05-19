import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import theme from "./theme";
import validator from "@/lib/condition-builder/validator";
import ConditionBuilder from "@/features/condition-builder";
import datasetFilter from "@/lib/condition-builder/filter";

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <main className="app">
        <header className="header">
          <h1>Condition Builder</h1>
        </header>
        <ConditionBuilder datasetFilter={datasetFilter} validator={validator} />
      </main>
    </ThemeProvider>
  );
};

export default App;
