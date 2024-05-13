import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import ConditionBuilder from "@/components/condition-builder";
import theme from "./theme";
import { Operators } from "./types/operator";
import AddressBar from "@/features/address-bar";

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <main className="app">
        <header className="header">
          <h1>Condition Builder</h1>
        </header>
        <AddressBar />
        <ConditionBuilder
          fields={["name", "age"]}
          operators={Object.values(Operators)}
          onChange={console.log}
        />
      </main>
    </ThemeProvider>
  );
};

export default App;
