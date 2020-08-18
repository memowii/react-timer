import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSync } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

export function Timer() {
  return (
    <div className="Timer">
      <div className="Timer__text-info">00:00:00:00</div>
      <input className="Timer__input" maxLength="6" defaultValue="0" />
      <div className="Timer__panel">
        <div className="btn-group">
          <button className="btn btn-lg btn-success" disabled="">
            <div className="text-right">
              <FontAwesomeIcon icon={faPlay} size="2x" className="s" />
            </div>
          </button>
          <button className="btn btn-lg btn-primary">
            <div className="text-left">
              <FontAwesomeIcon icon={faSync} size="2x" className="s" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
