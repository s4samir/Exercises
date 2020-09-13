/*
 * Authored by Samir Kishore
 */
import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import "./Control.scss";
import TimerWatch from "./TimerWatch/TimerWatch";

export function Controls({ startTheTimer, onNewGame }) {
  return (
    <div className="controls">
      <TimerWatch startTimer={startTheTimer} />
      <div className="newGame">
        <Button variant="contained" color="primary" onClick={onNewGame}>
          New Game
        </Button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  startTheTimer: PropTypes.bool.isRequired,
  onNewGame: PropTypes.func.isRequired,
};
