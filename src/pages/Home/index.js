import React from "react";

import { Timer } from '../../components/Timer';

export function Home() {

  return (
    <div className="container">
      <div className="d-flex flex-row justify-content-center pt-5">
        <Timer />
      </div>
    </div>
  );
}
