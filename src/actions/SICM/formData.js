import { formDataContants } from "../../constants/SICM";
import { formData } from "../../services/SICM";

function getFormData() {
  return (dispatch) => {
    dispatch({ type: formDataContants.GETFORMDATA_REQUEST });
    formData.getFormData().then(
      (formData) => {
        dispatch({ type: formDataContants.GETFORMDATA_SUCCESS, payload: formData });
      },
      (error) => {
        dispatch({
          type: formDataContants.GETFORMDATA_ERROR,
          error: error.toString(),
        });
      }
    );
  };
}

export const formDataAction = {
  getFormData,
};
