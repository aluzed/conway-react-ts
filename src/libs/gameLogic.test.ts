// based on https://playgameoflife.com/info
import { expect, test } from "vitest";
import { getCellInfo, runSimulation } from "./gameLogic";
import underpopulation from "./mocks/underpopulation.mock.json";
import overpopulation from "./mocks/overpopulation.mock.json";
import reproduction from "./mocks/reproduction.mock.json";
import survive from "./mocks/survive.mock.json";

test("Test getCellInfo", () => {
  expect(getCellInfo(survive, 1, 1)).toEqual({
    value: 1,
    neighbours: 2,
  });

  expect(getCellInfo(overpopulation, 1, 1)).toEqual({
    value: 1,
    neighbours: 5,
  });

  expect(getCellInfo(underpopulation, 1, 1)).toEqual({
    value: 1,
    neighbours: 1,
  });

  expect(getCellInfo(reproduction, 1, 1)).toEqual({
    value: 0,
    neighbours: 3,
  });
});

// Middle cell should die
test("Test applyCellRules: underpopulation", () => {
  expect(runSimulation(underpopulation)[1][1]).toEqual(0);
});

// Middle cell should die
test("Test applyCellRules: overpopulation", () => {
  expect(runSimulation(overpopulation)[1][1]).toEqual(0);
});

// Middle cell should be alive
test("Test applyCellRules: survive", () => {
  expect(runSimulation(survive)[1][1]).toEqual(1);
});

// Middle cell should be alive
test("Test applyCellRules: reproduction", () => {
  expect(runSimulation(reproduction)[1][1]).toEqual(1);
});

test("Test runSimulation: underpopulation", () => {
  expect(runSimulation(underpopulation)).toEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});

test("Test runSimulation: survive", () => {
  expect(runSimulation(survive)).toEqual([
    [0, 0, 0],
    [1, 1, 0],
    [0, 0, 0],
  ]);
});
