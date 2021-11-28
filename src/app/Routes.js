import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { alertActions } from "../actions";
import { tokenHasExpired } from "../helpers";

export function Routes() {
  //TODO fixed isAuthorized
  const { isAuthorized } = useSelector(
    () => ({
      isAuthorized:
        localStorage.getItem("SessionToken") !== null && !tokenHasExpired(),
    }),
    shallowEqual
  );

  const { alert, type, show } = useSelector((state) => state.alert);

  return (
    <>
      {alert !== "" && (
        <SimpleSnackbar message={alert} type={type} open={show} />
      )}
      <Switch>
        {!isAuthorized ? (
          <Route>
            <AuthPage />
          </Route>
        ) : (
          <Redirect from="/auth" to="/" />
        )}
        <Route path="/logout" component={Logout} />
        {!isAuthorized ? (
          <Redirect to="/auth/login" />
        ) : (
          <Layout>
            <BasePage />
          </Layout>
        )}
      </Switch>
    </>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SimpleSnackbar({ message, type, open }) {
  const dispatch = useDispatch();

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    dispatch(alertActions.clear());
  }

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
