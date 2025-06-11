import "./App.css";
import { GameProvider } from "./context/GameContext";
import { Grid } from "./components/Grid";
import { GameControl } from "./components/GameControl";

function App() {
  return (
    <GameProvider>
      <div className="container">
        <h1>Conway's Game of Life</h1>
        <Grid />
        <GameControl />
      </div>
    </GameProvider>
  );
}

export default App;
