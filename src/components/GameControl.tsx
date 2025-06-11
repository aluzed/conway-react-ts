import { useGameActions } from "@/hooks/useGameActions";
import { AiOutlineReload } from "react-icons/ai";
import { IoMdPlay } from "react-icons/io";
import { IoPauseOutline } from "react-icons/io5";

export const GameControl = () => {
  const {
    gameStarted,
    toggleGame,
    resetGame,
    gridLength,
    setNewLength,
    speedCoeff,
    setSpeedCoeff,
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
        <input
          type="range"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSpeedCoeff(Number(e.target.value));
          }}
          min={1}
          max={10}
          value={speedCoeff}
        />
        <span>Game speed: x{speedCoeff}</span>
      </div>

      <div className="control-action">
        <input
          type="range"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewLength(Number(e.target.value));
          }}
          min={3}
          max={1000}
          value={gridLength}
        />
        <span>Grid: {gridLength} cells</span>
      </div>
    </div>
  );
};
