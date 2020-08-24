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

it("changes elements when seconds are entering", () => {
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

// it('shows errors when adding employee', () => {
//   act(() => {
//     render(<App />, container);
//   });
//   const expectedClass = 'is-invalid';
//   const button = document.querySelector('[type=submit]');
//   expect(button.innerHTML).toBe('Add Employee');

//   act(() => {
//     button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
//     input.dispatchEvent(new MouseEvent('click', {bubbles: true}));
//   });

//   const nameInput = document.querySelector('form input[name=name]');
//   expect(nameInput.className).toEqual(expect.stringContaining(expectedClass));

//   const nameEmail = document.querySelector('form input[name=email]');
//   expect(nameInput.className).toEqual(expect.stringContaining(expectedClass));
// });
