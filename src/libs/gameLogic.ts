export const getCellInfo = (
  grid: number[][],
  x: number,
  y: number
): {
  value: number;
  neighbours: number;
} => {
  // Get the bounds
  const length = grid.length;

  const minX = x > 0 ? x - 1 : x;
  const maxX = x < length - 1 ? x + 1 : x;

  const minY = y > 0 ? y - 1 : y;
  const maxY = y < length - 1 ? y + 1 : y;

  // Get the state
  const value = grid[x][y];

  let neighbours = 0;

  // Scan around
  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      const isCurrentCell = i === x && j === y;
      const isPopulated = grid[i][j] === 1;
      if (isPopulated && !isCurrentCell) {
        neighbours++;
      }
    }
  }

  return {
    value,
    neighbours,
  };
};

export const applyCellRules = (
  grid: number[][],
  x: number,
  y: number
): number => {
  const { value, neighbours } = getCellInfo(grid, x, y);

  // By default keep the same state
  let newState = value;

  // Apply rules
  // dead cell
  if (!value) {
    // reproduction
    if (neighbours === 3) {
      newState = 1;
    }
  }
  // if populated
  else {
    // underpopulation
    if (neighbours < 2) {
      newState = 0;
    }
    // survive
    else if (neighbours >= 2 && neighbours <= 3) {
      newState = 1;
    }
    // overpopulation
    else if (neighbours > 3) {
      newState = 0;
    }
  }

  return newState;
};

export const runSimulation = (grid: number[][]) => {
  const length = grid.length;
  const newGrid = grid.map((line) => [...line]);

  for (let x = 0; x < length; x++) {
    for (let y = 0; y < length; y++) {
      const newState = applyCellRules(grid, x, y);
      newGrid[x][y] = newState;
    }
  }

  return newGrid;
};
