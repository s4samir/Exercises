/*
 * Authored by Samir Kishore
 */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import MineCell from "./MineCell/MineCell";
import "./MineField.scss";

export default function MineField({
  row,
  col,
  mineMap,
  startTimer,
  closeGame,
}) {
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const keyClicked = useRef({});
  const successfulClick = useRef(0);

  const prepareField = (row, col) => {
    const rows = [];
    for (let i = 1; i <= row; i++) {
      const cells = [];
      for (let j = 1; j <= col; j++) {
        const key = `${i}${j}`;
        const mine = gameOver ? isMine(key) : null;
        cells.push(
          <MineCell
            key={key}
            number={key}
            isMine={mine}
            onClick={onCellClick}
          />
        );
      }
      rows.push(
        <div className="minerow" key={i}>
          {cells}
        </div>
      );
    }
    return rows;
  };

  const isMine = (key) => mineMap.has(key);

  const isDone = () => successfulClick.current === row * col - mineMap.size;

  const onCellClick = (key) => {
    if (keyClicked.current[key]) {
      return keyClicked.current[key];
    }
    if (isMine(key)) {
      setGameOver(true);
      startTimer(false);
      keyClicked.current[key] = -1;
    } else {
      startTimer(true);
      keyClicked.current[key] = calculateMineAround(key, row, col, mineMap);
      successfulClick.current++;
      if (isDone()) {
        setGameWon(true);
      }
    }
    return keyClicked.current[key];
  };

  useEffect(() => {
    if (gameOver) {
      closeGame("over");
    }
    if (gameWon) {
      closeGame("won");
    }
  }, [gameOver, gameWon, closeGame]);
  return <div className={"minefield"}>{prepareField(row, col)}</div>;
}

const calculateMineAround = (key, row, col, mineMap) => {
  const neighbour = [
    // 8 neighbours of a node
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  const [i, j] = key;
  let count = 0;
  for (const curr of neighbour) {
    const [i1, j1] = curr;
    const [nextI, nextJ] = [+i + i1, +j + j1];

    if (
      nextI >= 1 &&
      nextI <= row &&
      nextJ >= 1 &&
      nextJ <= col &&
      mineMap.has(`${nextI}${nextJ}`)
    ) {
      count++;
    }
  }
  return count;
};

MineField.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  mineMap: PropTypes.any,
  startTimer: PropTypes.func,
  closeGame: PropTypes.func,
};

MineField.defaultProps = {
  row: 5,
  col: 5,
  mineMap: new Set(),
  startTimer: () => {},
  closeGame: () => {},
};
