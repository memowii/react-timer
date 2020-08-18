import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSync } from "@fortawesome/free-solid-svg-icons";

import { Time } from "../../Utils/time";
import "./index.css";

export function Timer() {
  const [timerInput, setTimerInput] = useState(0);
  const [calcTime, setCalcTime] = useState(Time.getTime(0));

  const onSecondsChanged = (value) => {
    const seconds = parseInt(value);
    if (seconds && typeof seconds === "number") {
      setTimes(seconds);
    } else {
      setTimes(0);
    }
  };

  const setTimes = (time) => {
    setTimerInput(time);
    setCalcTime(Time.getTime(time));
  };

  return (
    <div className="Timer">
      <div className="Timer__text-info">{calcTime}</div>

      <input
        className="Timer__input"
        maxLength="6"
        placeholder="0"
        value={timerInput}
        onChange={(e) => onSecondsChanged(e.target.value)}
      />

      <div className="Timer__panel">
        <div className="btn-group">
          <button
            className="btn btn-lg btn-success"
            disabled={!(timerInput > 0)}
          >
            <div className="text-right">
              <FontAwesomeIcon icon={faPlay} size="2x" className="s" />
            </div>
          </button>

          <button
            className="btn btn-lg btn-primary"
            onClick={() => setTimes(0)}
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
