import { GameContext } from "@/context/GameContext";
import { runSimulation } from "@/libs/gameLogic";
import { generateGrid } from "@/libs/grid.lib";
import { useContext, useEffect } from "react";

export const useGameActions = () => {
  const {
    gameStarted,
    setGameStarted,
    grid,
    setGrid,
    gridLength,
    setGridLength,
    speedCoeff,
    setSpeedCoeff,
  } = useContext(GameContext);

  const resetGame = () => {
    setGameStarted(false);
    setGrid(generateGrid(gridLength));
  };

  const toggleGame = () => {
    setGameStarted(!gameStarted);
  };

  const setNewLength = (newGridLength: number) => {
    setGridLength(newGridLength);
    setGrid(generateGrid(newGridLength));
  };

  useEffect(() => {
    let interval = null;

    if (gameStarted) {
      interval = setInterval(() => {
        setGrid(runSimulation(grid));
      }, Math.round(1000 / speedCoeff));
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, speedCoeff, grid]);

  return {
    gameStarted,
    speedCoeff,
    gridLength,
    resetGame,
    toggleGame,
    setSpeedCoeff,
    setNewLength,
  };
};
