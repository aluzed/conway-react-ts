import { useContext, useEffect } from "react";
import { GameContext } from "@/context/GameContext";
import { generateGrid } from "@/libs/grid.lib";

export const useGameDraw = () => {
  const { grid, setGrid, gridLength, setGridLength, setGameStarted, loading } =
    useContext(GameContext);

  useEffect(() => {
    // Generate grid the first run
    if (grid.length === 0 && gridLength !== 0) {
      setGrid(generateGrid(gridLength));
    }
  }, [grid, gridLength, setGrid]);

  const toggleCell = (x: number, y: number) => {
    // Stop the game to avoid direct update
    setGameStarted(false);

    // Re-render
    const newGrid = [...grid];
    newGrid[x][y] = newGrid[x][y] === 1 ? 0 : 1;
    setGrid(newGrid);
  };

  return {
    loading,
    grid,
    gridLength,
    setGridLength,
    toggleCell,
  };
};
