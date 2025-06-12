import { GameContext } from "@/context/GameContext";
import { runSimulation } from "@/libs/gameLogic";
import { generateGrid, generateRandomGrid } from "@/libs/grid.lib";
import { startTransition, useContext, useEffect } from "react";

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
    setLoading,
  } = useContext(GameContext);

  const resetGame = () => {
    setGameStarted(false);
    setGrid(generateGrid(gridLength));
  };

  const toggleGame = () => {
    setGameStarted(!gameStarted);
  };

  const setNewLength = (newGridLength: number) => {
    setLoading(true);
    startTransition(() => {
      setGridLength(newGridLength);
      setGrid(generateGrid(newGridLength));
      setLoading(false);
    });
  };

  const randomizeGrid = () => {
    setGameStarted(false);
    setGrid(generateRandomGrid(gridLength));
  };

  useEffect(() => {
    let interval = null;

    if (gameStarted) {
      interval = setInterval(async () => {
        const splitted: Array<number[][]> = Array.from(
          {
            length: Math.ceil(grid.length / 1000),
          },
          (_, i) => grid.slice(i * 1000, i * 1000 + 1000)
        );

        const newGrids: Array<number[][]> = await Promise.all(
          splitted.map(
            (chunk) =>
              new Promise<number[][]>((resolve) =>
                resolve(runSimulation(chunk))
              )
          )
        );

        setGrid(newGrids.flat());
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
    randomizeGrid,
  };
};
