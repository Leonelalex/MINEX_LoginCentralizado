import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import { Sistemas, Roles, Usuarios } from "./modules";
import { userActions } from "../../../actions";
import { catalogosActions } from "./actions";
import { userService } from "../../../services/";
import { SYSTEMS } from "../../../constants";

export function LIC() {
  const dispatch = useDispatch();
  const loadingToken = useSelector((state) => state.user.loadingToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getToken() {
      try {
        const sistems = await userService.getToken(SYSTEMS["SSO"]);
        dispatch(userActions.setSubMenus(sistems[0].hijos || []));
        getCatalogos();
      } catch (error) {
        console.log(error);
      }
    }

    function getCatalogos() {
      dispatch(catalogosActions.getMenus());
      dispatch(catalogosActions.getPermitions());
    }

    dispatch(userActions.setTokenRequest());
    getToken();
    return () => {
      dispatch(userActions.setTokenRequest());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loadingToken) {
      setLoading(false);
    }
  }, [loadingToken]);

  return (
    <>
      {!loading && (
        <Switch>
          <ContentRoute exact path="/SSO/" component={Usuarios} />
          <ContentRoute path="/SSO/Sistemas" component={Sistemas} />
          <ContentRoute path="/SSO/Roles" component={Roles} />
          <ContentRoute path="/SSO/Usuarios" component={Usuarios} />
        </Switch>
      )}
    </>
  );
}
