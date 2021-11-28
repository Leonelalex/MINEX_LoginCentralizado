import React, { useEffect, Suspense, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { CardBody, Card } from "../../_metronic/_partials/controls/Card";
import { AppCard } from "../modules/Apps/AppCard.jsx";
import { userActions } from "../../actions";
import { ContentRoute } from "../../_metronic/layout";
import { AlbaKeneth } from "../modules/SICM/modules/AlbaKeneth";
import { Find } from "../modules/SICM/modules/Find";
import { IsabelClaudina } from "../modules/SICM/modules/IsabelClaudina";
import { Catalogos } from "../modules/SICM/modules/Catalogos";
import { Reports } from "../modules/SICM/modules/Reports";
import { userService } from "../../services";
import { SYSTEMS } from "../../constants";
import { LIC } from "../modules/LIC/LIC";

export function DashboardPage() {
  return (
    <Suspense>
      <Switch>
        <Route path="/SICM">
          <SICM></SICM>
        </Route>
        <Route path="/SSO">
          <LIC></LIC>
        </Route>
        <Route exact path="/loading">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "0vh",
            }}
          >
            <CircularProgress />
          </div>
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </Suspense>
  );
}

function SICM() {
  const dispatch = useDispatch();
  const loadingToken = useSelector((state) => state.user.loadingToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getToken() {
      try {
        const sistems = await userService.getToken(SYSTEMS["SICM"]);
        dispatch(userActions.setSubMenus(sistems[0].hijos || []));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(userActions.setTokenRequest());
    getToken();
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
          <ContentRoute exact path="/SICM/" component={Find} />
          <ContentRoute path="/SICM/AlbaKeneth" component={AlbaKeneth} />
          <ContentRoute
            path="/SICM/IsabelClaudina"
            component={IsabelClaudina}
          />
          <ContentRoute path="/SICM/Catalogos" component={Catalogos} />
          <ContentRoute path="/SICM/Reportes" component={Reports} />
        </Switch>
      )}
    </>
  );
}

function Dashboard() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.setSubMenus([]));
    dispatch(userActions.setTokenRequest());
    return () => {
      dispatch(userActions.setTokenRequest());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <CardBody>
        <h1>Aplicaciones</h1>
        <div className="row pt-10">
          {user &&
            user.sistems.map((sistem) => (
              <div key={sistem.siglas} className="col-12 col-sm-4 col-md-3">
                <AppCard sistem={sistem} />
              </div>
            ))}
        </div>
      </CardBody>
    </Card>
  );
}
