import React from "react";
import { Navbar } from "../Navbar";

export function Layout(props) {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
    </React.Fragment>
  );
}
