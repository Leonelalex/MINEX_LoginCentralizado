import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../actions";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { DashboardPage } from "./pages/DashboardPage";
import UserPage from './modules/UserProfile/UserProfilePage';

export default function BasePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("SessionToken") != null)
      dispatch(userActions.userInfo());
    else dispatch(userActions.logout());
  }, [dispatch]);

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path="/user-profile" component={UserPage} />
        <ContentRoute path="/" component={DashboardPage} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}
