import "./App.css";
import Condition from "./components/condition";
import { Operators } from "./types/operator";

const App = (): JSX.Element => {
  return (
    <main className="app">
      <header className="header">
        <h1>Condition Builder</h1>
        <Condition
          fields={["name"]}
          operators={Object.values(Operators)}
          onChange={(condition) => console.log(condition)}
        />
      </header>
    </main>
  );
};

export default App;
