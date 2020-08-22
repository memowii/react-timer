import React, { useState, useEffect } from "react";
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
  const [isAlmostFinished, setIsAlmostFinished] = useState(false);

  const onSecondsChanged = (value) => {
    const enteredSeconds = parseInt(value);
    if (enteredSeconds && typeof enteredSeconds === "number") {
      const enteredMilliseconds = enteredSeconds * 1000;
      setMilliseconds(enteredMilliseconds);
      setTimeInfo(Time.getTime(enteredMilliseconds));
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
    setMilliseconds(0);
    setSeconds(0);
    setIsTimerStarted(false);
    setTimeInfo(Time.getTime(0));
    clearInterval(timerInterval);
  };

  const startTimer = () => {
    setIsTimerStarted(true);
    setTimerInterval(
      setInterval(() => {
        setMilliseconds((prevMilliseconds) => prevMilliseconds - 10);
      }, 10)
    );
  };

  const stopTimer = () => {
    setMilliseconds((mil) => {
      setSeconds(Math.floor(mil / 1000));
      setTimeInfo(Time.getTime(mil));
      clearInterval(timerInterval);

      return mil;
    });
    setIsTimerStarted(false);
    setIsAlmostFinished(false)
  };

  useEffect(() => {
    setTimeInfo(Time.getTime(milliseconds));
    
    if (isTimerStarted && milliseconds < 10 * 1000) {
      console.log('in inf');
      setIsAlmostFinished(true);
    }

    if (milliseconds < 0) {
      setMilliseconds(0);
      setSeconds(0);
      setIsTimerStarted(false);
      setTimeInfo(Time.getTime(0));
      clearInterval(timerInterval);
    }
  }, [milliseconds]);

  return (
    <div className="Timer">
      <div
        className="Timer__text-info"
        hidden={isTimerStarted}
      >
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
        <div className={`Timer__text-info Timer__text-info--big ${
          isAlmostFinished ? "Timer__text-info--red" : ""
        }`}>{timeInfo}</div>
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
                startTimer();
              } else {
                stopTimer();
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
