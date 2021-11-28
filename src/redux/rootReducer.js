import { combineReducers } from "redux";
import { user } from "./user.reducer";
import { auth } from "./auth.reducer";
import { alert } from "./alert.reducer";
import { formData } from "./formData.reducer";
import { albaKeneth } from "./albaKeneth.reducer";
import { isabelClaudina } from "./isabelClaudina.reducer";
import { licData } from "./lic.reducer";

export const rootReducer = combineReducers({
  auth,
  user,
  alert,
  formData,
  albaKeneth,
  isabelClaudina,
  licData,
});
