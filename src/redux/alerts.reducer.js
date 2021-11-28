import { alertConstants } from "../constants/SICM";

const initalAlertsState = {
  type: "",
  message: "",
  open: false,
};

export function alerts(state = initalAlertsState, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return { ...action.payload, open: true, type: "success" };
    case alertConstants.ERROR:
      return { ...action.payload, open: true, type: "error" };
    case alertConstants.CLEAR:
      return { open: false };
    default:
      return state;
  }
}
