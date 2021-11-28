import { formDataContants } from "../constants/SICM";

const initalFormDataState = {
  loading: true,
  formData: null,
  hasError: false,
  error: "",
};

export function formData(state = initalFormDataState, action) {
  switch (action.type) {
    case formDataContants.GETFORMDATA_REQUEST:
      return { loading: true, ...state };
    case formDataContants.GETFORMDATA_SUCCESS:
      return { ...action.payload, formData: { ...action.payload } };
    case formDataContants.GETFORMDATA_ERROR:
      return { hasError: true, error: action.payload };
    default:
      return state;
  }
}
