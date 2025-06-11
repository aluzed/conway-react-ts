import { createContext, useState } from "react";

export type GameContextType = {
  gridLength: number;
  setGridLength: (length: number) => void;
  gameStarted: boolean;
  setGameStarted: (started: boolean) => void;
  grid: number[][];
  setGrid: (grid: number[][]) => void;
  speedCoeff: number;
  setSpeedCoeff: (coeff: number) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const GameContext = createContext<GameContextType>({
  gridLength: 0,
  setGridLength: () => {},
  gameStarted: false,
  setGameStarted: () => {},
  grid: [],
  setGrid: () => {},
  speedCoeff: 1,
  setSpeedCoeff: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gridLength, setGridLength] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [grid, setGrid] = useState<number[][]>([]);
  const [speedCoeff, setSpeedCoeff] = useState(1);

  return (
    <GameContext.Provider
      value={{
        gridLength,
        setGridLength,
        gameStarted,
        setGameStarted,
        grid,
        setGrid,
        speedCoeff,
        setSpeedCoeff,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
