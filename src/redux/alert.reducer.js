import { alertConstants } from "../constants/reducer.constants";

const initialData = {
  alert: "",
  show: false,
  type: "",
};

export function alert(state = initialData, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return { alert: action.payload, type: "success", show: true };
    case alertConstants.ERROR:
      return { alert: action.payload, type: "error", show: true };
    case alertConstants.CLEAR:
      return { type: "info", show: false };
    default:
      return state;
  }
}
