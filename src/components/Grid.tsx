import { useGameDraw } from "@/hooks/useGameDraw";
import React from "react";

export const Grid = () => {
  const { grid, gridLength, toggleCell, loading } = useGameDraw();

  const gridArray = grid.map((line, lineIndex) => {
    return (
      <div
        className="line"
        key={lineIndex}
        style={{
          height: `${(100 / gridLength).toFixed(2)}%`,
        }}
      >
        {line.map((value, cellIndex) => {
          return (
            <div
              className={`${value ? "alive-cell" : "dead-cell"}`}
              key={cellIndex}
              onClick={() => toggleCell(lineIndex, cellIndex)}
              style={{
                width: `${(100 / gridLength).toFixed(2)}%`,
                height: `100%`,
              }}
            ></div>
          );
        })}
      </div>
    );
  });

  return (
    <>
      {loading && (
        <div className="loading">
          <div className="loading-message">
            Please wait while loading the grid ☕
          </div>
        </div>
      )}

      <div className="grid">
        {gridArray.map((lines, index) => (
          <React.Fragment key={index}>{lines}</React.Fragment>
        ))}
      </div>
    </>
  );
};
