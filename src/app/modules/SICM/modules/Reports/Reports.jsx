import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { CardHeader } from "@material-ui/core/";
import { reports } from "../../../../../services/SICM";
import { digracomReport, estadoReport } from "../../../../../helpers/SICM";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import CardReport from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  Card,
  CardBody,
} from "../../../../../_metronic/_partials/controls/Card";

function Reports() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  async function createReport() {
    try {
      const data = await reports.digracomReport();
      digracomReport({
        data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function createReport2() {
    try {
      const year = selectedDate.getFullYear();
      const activadas = await reports.activadasMes(year);
      const desactivadas = await reports.desactivadasMes(year);
      estadoReport({
        activadas,
        desactivadas,
        year: year,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function selectDate(e) {
    setSelectedDate(e);
  }

  return (
    <Card>
      <CardHeader title="Reportes" />
      <CardBody>
        <div className="row">
          <div className="col-6 col-sm-6 col-md-4">
            <CardReport style={{ height: "100%" }}>
              <CardContent>
                <h5>Reporte 1</h5>
                <Typography variant="body2">
                  Historial de estadísticas de alertas filtradas por caso.
                </Typography>
              </CardContent>
              <CardActions>
                <div className="col-12" style={{ display: "flex" }}>
                  <Button
                    style={{ marginLeft: "auto" }}
                    color="primary"
                    variant="outlined"
                    onClick={createReport}
                  >
                    Descargar
                  </Button>
                </div>
              </CardActions>
            </CardReport>
          </div>
          <div className="col-6 col-sm-6 col-md-4">
            <CardReport style={{ height: "100%" }}>
              <CardContent>
                <h5>Reporte 2</h5>
                <Typography variant="body2">
                  Estadisticas de Alertas activadas y desactivadas por año.
                </Typography>
                <MuiPickersUtilsProvider utils={MomentUtils} locale="es">
                  <DatePicker
                    views={["year"]}
                    label="Año"
                    value={selectedDate}
                    maxDate={new Date()}
                    onChange={(e) => selectDate(e)}
                    openTo="date"
                    inputVariant="outlined"
                    format="YYYY"
                    margin="dense"
                  />
                </MuiPickersUtilsProvider>
              </CardContent>
              <CardActions>
                <div className="col-12" style={{ display: "flex" }}>
                  <Button
                    style={{ marginLeft: "auto" }}
                    color="primary"
                    variant="outlined"
                    onClick={createReport2}
                  >
                    Descargar
                  </Button>
                </div>
              </CardActions>
            </CardReport>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export { Reports };
