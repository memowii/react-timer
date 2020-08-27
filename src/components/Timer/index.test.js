import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";

import { Timer } from "./";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders Timer", () => {
  act(() => {
    render(<Timer />, container);
  });

  const timerTextInfoContent = container.querySelector(".Timer__text-info")
    .textContent;
  expect(timerTextInfoContent).toBe("00:00:00:00");

  const timerInput = container.querySelector(".Timer__input");
  expect(timerInput.textContent).toBe("");
  expect(timerInput.value).toBe("0");
  expect(timerInput.placeholder).toBe("0");
  expect(
    container.querySelector(".btn-group .text-right").firstChild.tagName
  ).toBe("svg");
  expect(
    container.querySelector(".btn-group .text-left").firstChild.tagName
  ).toBe("svg");
});

it("tests Timer when seconds are entered", () => {
  act(() => {
    render(<Timer />, container);
  });

  const timerInput = container.querySelector("input.Timer__input");
  const timerTextInfo = container.querySelector(".Timer__text-info");
  const btnStart = container.querySelector(".Timer__panel .btn-success");

  act(() => {
    Simulate.change(timerInput, { target: { value: "100" } });
  });

  expect(timerInput.value).toBe("100");
  expect(timerTextInfo.textContent).toBe("00:01:40:00");
  expect(btnStart.disabled).toBe(false);
});

it("tests Timer when it is started", () => {
  act(() => {
    render(<Timer />, container);
  });

  const timerInput = container.querySelector("input.Timer__input");
  const btnStartStop = container.querySelector(".Timer__panel .btn-success");

  act(() => {
    Simulate.change(timerInput, { target: { value: "100" } });
  });

  act(() => {
    btnStartStop.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const timerTextInfo = container.querySelector(
    ".Timer__text-info.Timer__text-info--big"
  );

  expect(timerTextInfo.textContent.slice(3, 5)).toBe("01");
  expect(btnStartStop.classList.contains("btn-dark")).toBe(true);
});

it("tests Timer when it is almost finished", () => {
  jest.useFakeTimers();

  act(() => {
    render(<Timer />, container);
  });

  const timerInput = container.querySelector("input.Timer__input");
  const btnStartStop = container.querySelector(".Timer__panel .btn-success");

  act(() => {
    Simulate.change(timerInput, { target: { value: "11" } });
  });

  act(() => {
    btnStartStop.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  act(() => jest.advanceTimersByTime(1100));

  const timerTextInfo = container.querySelector(
    ".Timer__text-info.Timer__text-info--big"
  );
  expect(timerTextInfo.classList.contains("Timer__text-info--red")).toBe(true);
});

it("tests Timer when it is resetted", () => {
  jest.useFakeTimers();

  act(() => {
    render(<Timer />, container);
  });

  let timerInput = container.querySelector("input.Timer__input");
  const btnStartStop = container.querySelector(".Timer__panel .btn-success");
  const btnRestart = container.querySelector(".Timer__panel .btn-primary");

  act(() => {
    Simulate.change(timerInput, { target: { value: "11" } });
  });

  act(() => {
    btnStartStop.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  act(() => jest.advanceTimersByTime(3000));

  expect(btnStartStop.classList.contains("btn-dark")).toBe(true);
  expect(btnStartStop.disabled).toBe(false);

  act(() => {
    btnRestart.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(btnStartStop.classList.contains("btn-dark")).toBe(false);
  expect(btnStartStop.disabled).toBe(true);

  // Take this element again because the old one is destroyed and replaced for a new object.
  timerInput = container.querySelector(".Timer__input");

  expect(timerInput.value).toBe("0");
});
