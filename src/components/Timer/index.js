import React, { useReducer, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSync, faStop } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

import { TimerInitialState, TimerReducer } from "../../reducers/timerReducer";

export function Timer() {
  const [state, dispatch] = useReducer(TimerReducer, TimerInitialState);

  const onSecondsChanged = (value) => {
    const enteredSeconds = parseInt(value);
    if (enteredSeconds && typeof enteredSeconds === "number") {
      const enteredMilliseconds = enteredSeconds * 1000;
      setTimes(enteredMilliseconds, enteredSeconds);
    } else {
      setTimes(0, 0);
    }
  };

  const setTimes = (milliseconds, seconds) => {
    dispatch({ type: "MILLISECONDS", payload: milliseconds });
    dispatch({ type: "TIMEINFO", payload: milliseconds });
    dispatch({ type: "SECONDS", payload: seconds });
  };

  const startTimer = () => {
    dispatch({ type: "TIMER_STARTED", payload: true });

    const timerInterval = setInterval(() => {
      dispatch({ type: "DEC_MILLISECONDS" });
      dispatch({ type: "UPDATE_TIMEINFO" });
    }, 10);

    dispatch({ type: "TIMER_INTERVAL", payload: timerInterval });
  };

  const stopTimer = () => {
    dispatch({
      type: "SECONDS",
      payload: Math.floor(state.milliseconds / 1000),
    });
    dispatch({ type: "TIMEINFO", payload: state.milliseconds });
    clearInterval(state.timerInterval);
    dispatch({ type: "TIMER_INTERVAL", payload: null });
    dispatch({ type: "TIMER_STARTED", payload: false });
    dispatch({ type: "TIMER_ALMOST_FINISHED", payload: false });
  };

  const resetTimer = () => {
    dispatch({ type: "TIMER_STARTED", payload: false });
    dispatch({ type: "MILLISECONDS", payload: 0 });
    dispatch({ type: "SECONDS", payload: 0 });
    dispatch({ type: "TIMEINFO", payload: 0 });
    dispatch({ type: "TIMER_ALMOST_FINISHED", payload: false });
    clearInterval(state.timerInterval);
    dispatch({ type: "TIMER_INTERVAL", payload: null });
  };

  useEffect(() => () => clearInterval(state.timerInterval), [
    state.timerInterval,
  ]);

  return (
    <div className="Timer">
      <div className="Timer__text-info" hidden={state.isTimerStarted}>
        {state.timeInfo}
      </div>

      {!state.isTimerStarted ? (
        <input
          className="Timer__input"
          maxLength="6"
          placeholder="0"
          value={state.seconds}
          onChange={(e) => onSecondsChanged(e.target.value)}
        />
      ) : (
        <div
          className={`Timer__text-info Timer__text-info--big ${
            state.isAlmostFinished ? "Timer__text-info--red" : ""
          }`}
        >
          {state.timeInfo}
        </div>
      )}

      <div className="Timer__panel">
        <div className="btn-group">
          <button
            className={`btn btn-lg btn-success ${
              state.isTimerStarted ? "btn-dark" : ""
            }`}
            disabled={!(state.milliseconds > 0)}
            onClick={() => {
              if (!state.isTimerStarted) {
                startTimer();
              } else {
                stopTimer();
              }
            }}
          >
            <div className="text-right">
              {!state.isTimerStarted ? (
                <FontAwesomeIcon icon={faPlay} size="2x" className="s" />
              ) : (
                <FontAwesomeIcon icon={faStop} size="2x" className="s" />
              )}
            </div>
          </button>

          <button
            className="btn btn-lg btn-primary"
            onClick={() => resetTimer()}
          >
            <div className="text-left">
              <FontAwesomeIcon icon={faSync} size="2x" className="s" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
