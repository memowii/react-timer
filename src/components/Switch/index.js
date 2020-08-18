import React from "react";

import "./index.css";

export function Switch({ isDateShown, toggleDate }) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        defaultChecked={isDateShown}
        onChange={() => toggleDate()}
      />
      <span className="switch__slider switch__slider--round"></span>
    </label>
  );
}
