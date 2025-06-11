import { useGameActions } from "@/hooks/useGameActions";
import { AiOutlineReload } from "react-icons/ai";
import { IoMdPlay } from "react-icons/io";
import { IoPauseOutline, IoShuffle } from "react-icons/io5";
import { Slider } from "./Slider";

export const GameControl = () => {
  const {
    gameStarted,
    toggleGame,
    resetGame,
    gridLength,
    setNewLength,
    speedCoeff,
    setSpeedCoeff,
    randomizeGrid,
  } = useGameActions();

  return (
    <div className="control-panel">
      <div className="control-action">
        <button
          className="control-button"
          title={gameStarted ? "Click to pause" : "Click to run"}
          onClick={toggleGame}
        >
          {gameStarted ? <IoPauseOutline /> : <IoMdPlay />}
        </button>
      </div>

      <div className="control-action">
        <button
          className="control-button"
          title="Click to restart"
          onClick={resetGame}
        >
          <AiOutlineReload />
        </button>
      </div>

      <div className="control-action">
        <button
          className="control-button"
          title="Click to randomize"
          onClick={randomizeGrid}
        >
          <IoShuffle />
        </button>
      </div>

      <div className="control-action">
        <Slider
          onChange={(newSpeed) => {
            setSpeedCoeff(newSpeed);
          }}
          min={1}
          max={10}
          defaultValue={speedCoeff}
        />
        <span>Game speed: x{speedCoeff}</span>
      </div>

      <div className="control-action">
        <Slider
          onChange={(newGridLength) => {
            setNewLength(newGridLength);
          }}
          min={3}
          max={1000}
          defaultValue={gridLength}
        />
        <span>
          Grid: {gridLength}x{gridLength} cells
        </span>
      </div>
    </div>
  );
};
