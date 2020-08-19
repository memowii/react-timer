import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSync, faStop } from "@fortawesome/free-solid-svg-icons";

import { Time } from "../../Utils/time";
import "./index.css";

export function Timer() {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeInfo, setTimeInfo] = useState(Time.getTime(0));
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);

  const onSecondsChanged = (value) => {
    const enteredSeconds = parseInt(value);
    if (enteredSeconds && typeof enteredSeconds === "number") {
      const milliseconds = enteredSeconds * 1000;
      setMilliseconds(milliseconds);
      setTimeInfo(Time.getTime(milliseconds));
      setSeconds(enteredSeconds);
    } else {
      setMilliseconds(0);
      setTimeInfo(Time.getTime(0));
      setSeconds(0);
    }
  };

  const setTimes = (time) => {
    setMilliseconds(time);
    setTimeInfo(Time.getTime(time / 1000));
  };

  const resetTimer = () => {
    setTimes(0);
    setIsTimerStarted(false);
  };

  const startTimer = () => {
    setTimerInterval(
      setInterval(() => {
        console.log("do");
        setMilliseconds((state) => {
          console.log("do 2");
          return state - 10;
        });
        setTimeInfo(Time.getTime(milliseconds));
      }, 10)
    );
  };

  const stopTimer = () => {};

  return (
    <div className="Timer">
      <div className="Timer__text-info" hidden={isTimerStarted}>
        {timeInfo}
      </div>

      {!isTimerStarted ? (
        <input
          className="Timer__input"
          maxLength="6"
          placeholder="0"
          value={seconds}
          onChange={(e) => onSecondsChanged(e.target.value)}
        />
      ) : (
        <div className="Timer__text-info Timer__text-info--big">{timeInfo}</div>
      )}

      <div className="Timer__panel">
        <div className="btn-group">
          <button
            className={`btn btn-lg btn-success ${
              isTimerStarted ? "btn-dark" : ""
            }`}
            disabled={!(milliseconds > 0)}
            onClick={() => {
              if (!isTimerStarted) {
                setIsTimerStarted(true);
                startTimer();
              } else {
                setIsTimerStarted(false);
              }
            }}
          >
            <div className="text-right">
              {!isTimerStarted ? (
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
