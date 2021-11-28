/* eslint no-restricted-imports: ["error"] */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CardHeader, Grid } from "@material-ui/core";
import {
  CardBody,
  Card,
} from "../../../../../_metronic/_partials/controls/Card";
import { bitacoraService, findService } from "../../../../../services/SICM";
import { alertAction } from "../../../../../actions/SICM";
import LogList from "./LogList.jsx";
import LinearProgress from "@material-ui/core/LinearProgress";

function Bitacora({ caso }) {
  const dispatch = useDispatch();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (caso !== undefined) {
      getBitacora(caso);
    }
    // eslint-disable-next-line
  }, []);

  async function getBitacora(id) {
    try {
      setLoading(true);
      const alert = await findService.getAlert(id);
      if (alert.message) {
        throw alert.message;
      }
      const data = await bitacoraService.getBitacora(alert.codigo);
      setLogs(data);
    } catch (error) {
      dispatch(alertAction.error(error));
      setLogs([]);
    }
    setLoading(false);
  }

  return (
    <Card>
      {!caso && (
        <CardHeader title={"Bitácora de acciones Alerta Alba-Keneth " + caso} />
      )}
      <CardBody>
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={1}>
            <Grid item xs={12} style={{ marginTop: 30 }}>
              {loading && <LinearProgress />}
              <LogList logs={logs} loading={loading} />
            </Grid>
          </Grid>
        </form>
      </CardBody>
    </Card>
  );
}

export { Bitacora };
