/*
 * Authored by Samir Kishore
 */
import React, { useState } from "react";
import "./App.scss";
import MineField from "./Components/MineField/MineField";
import Controls from "./Components/Controls/Controls";
import TopForm from "./Components/TopForm/TopForm";
import ResultDialog from "./Components/ResultDialog/ResultDialog";

function App() {
  const [mineMap, setMineMap] = useState(null);
  const [level, setLevel] = useState([5, 5]);
  const [isHome, setIsHome] = useState(true);
  const [timer, setTimer] = useState(false);
  const [result, setResult] = useState("");
  const onLevelChange = (value) => {
    const [row, col] = value;
    const mine = Math.floor(0.4 * (parseInt(row) * parseInt(col)));
    setLevel([+row, +col]);
    setMineMap(getUniqueRandom(+row, +col, mine));
    setIsHome(false);
  };

  const gameView = () => (
    <>
      <Controls startTheTimer={timer} onNewGame={reset} />

      <div className="minegame">
        <MineField
          row={level[0]}
          col={level[1]}
          mineMap={mineMap}
          startTimer={(val) => setTimer(val)}
          closeGame={handleGameResult}
        />
      </div>
      <ResultDialog onClose={reset} result={result} />
    </>
  );

  const handleGameResult = (result) => {
    setResult(result);
  };

  const reset = () => {
    setResult("");
    setIsHome(true);
  };

  const homeView = () => <TopForm onLevelChange={onLevelChange} />;

  return <div className="App">{isHome ? homeView() : gameView()} </div>;
}

const getUniqueRandom = (row, col, mines) => {
  const nums = new Set();
  while (nums.size !== mines) {
    const x = Math.floor(Math.random() * row) + 1,
      y = Math.floor(Math.random() * col) + 1;
    nums.add(`${x}${y}`);
  }
  return nums;
};

export default App;
