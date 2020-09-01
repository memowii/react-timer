import { Time } from "../Utils/time";

export const TimerInitialState = {
  milliseconds: 0,
  seconds: 0,
  timeInfo: Time.getTime(0),
  isTimerStarted: false,
  timerInterval: null,
  isAlmostFinished: false,
};

export function TimerReducer(state, action) {
  switch (action.type) {
    case "MILLISECONDS":
      return { ...state, milliseconds: action.payload };
    case "DEC_MILLISECONDS":
      if (state.isTimerStarted && state.milliseconds < 10 * 1000) {
        state.isAlmostFinished = true;
      }

      if (state.milliseconds < 0) {
        clearInterval(state.timerInterval);
        return { ...TimerInitialState };
      }

      return {
        ...state,
        milliseconds: state.milliseconds - 10,
      };
    case "SECONDS":
      return { ...state, seconds: action.payload };
    case "TIMEINFO":
      return { ...state, timeInfo: Time.getTime(action.payload) };
    case "UPDATE_TIMEINFO":
      return { ...state, timeInfo: Time.getTime(state.milliseconds) };
    case "TIMER_STARTED":
      return { ...state, isTimerStarted: action.payload };
    case "TIMER_INTERVAL":
      return { ...state, timerInterval: action.payload };
    case "TIMER_ALMOST_FINISHED":
      return { ...state, isAlmostFinished: action.payload };
    default:
      throw new Error();
  }
}
