/*
 * Authored by Samir Kishore
 */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { differenceInSeconds } from "date-fns";
import TimerOff from "@material-ui/icons/TimerOff";
import Timer from "@material-ui/icons/Timer";

export default function TimerWatch({ startTimer }) {
  const [timerOn, setTimerOn] = useState(false);
  const [timerTime, setTimerTime] = useState(0);
  const timer = useRef();

  useEffect(() => {
    const startTheTimer = () => {
      setTimerOn(true);
      const now = Date.now();
      timer.current = setInterval(() => {
        setTimerTime(differenceInSeconds(Date.now(), now));
      }, 10);
    };

    const stopTheTimer = () => {
      setTimerOn(false);
      clearInterval(timer.current);
    };

    if (startTimer && !timerOn) {
      startTheTimer();
    } else if (!startTimer && timerOn) {
      stopTheTimer();
    }
    return function cleanup() {
      clearInterval(timer.current);
    };
  }, [startTimer]);

  return (
    <div className="timer">
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>{startTimer ? <TimerOff /> : <Timer />}</Grid>
        <Grid item>
          <TextField
            id="input-with-icon-grid"
            disabled={true}
            value={timerTime}
            className="timer_input"
          >
            {timerTime}
          </TextField>
        </Grid>
      </Grid>
    </div>
  );
}

TimerWatch.propTypes = {
  startTimer: PropTypes.bool,
};
