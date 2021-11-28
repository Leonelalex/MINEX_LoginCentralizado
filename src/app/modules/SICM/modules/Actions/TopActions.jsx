/* eslint no-restricted-imports: ["error"] */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import LinearProgress from "@material-ui/core/LinearProgress";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Button from "@material-ui/core/Button";
import { Pagination } from "../../components";
import { actionsService } from "../../../../../services/SICM";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import {
  formatDate,
  formDataFunctions,
  getRouteFile,
  getRouteOficio,
  createReport,
} from "../../../../../helpers/SICM";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

function TopActions({ tipo, formData }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectRange, setSelectRange] = useState("day");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [props, setProps] = useState({ page: 1, size: 10 });

  const getDateArray = () => {
    if (selectRange === "day") return ["date"];
    else if (selectRange === "month") return ["year", "month"];
    return ["year"];
  };

  const getDateFormat = () => {
    if (selectRange === "day") return "DD/MM/YYYY";
    else if (selectRange === "month") return "MM/YYYY";
    return "YYYY";
  };

  const handleDateChange = (e) => {
    setSelectedDate(e);
    find({ _d: e._d, props: props });
  };

  function onPageChange(props) {
    setProps(props);
    find({ _d: selectedDate, props });
  }

  const find = async ({ _d, props }) => {
    let fechaInicio = "";
    let fechaFin = "";
    let date = new Date(_d);

    if (selectRange === "day") {
      fechaInicio = `${date.toISOString().split("T")[0]}T00:00:00.000Z`;
      fechaFin = `${date.toISOString().split("T")[0]}T23:59:59.999Z`;
    } else if (selectRange === "month") {
      let y = date.getFullYear(),
        m = date.getMonth();
      const firstDay = new Date(y, m, 1);
      const lastDay = new Date(y, m + 1, 0);
      fechaInicio = `${firstDay.toISOString().split("T")[0]}T00:00:00.000Z`;
      fechaFin = `${lastDay.toISOString().split("T")[0]}T23:59:59.999Z`;
    } else {
      let year = date.getFullYear();
      fechaInicio = `${year}-01-01T00:00:00.000Z`;
      fechaFin = `${year}-12-31T00:00:00.000Z`;
    }

    try {
      const body = {
        tipoAlerta: tipo,
        fechaInicio,
        fechaFin,
      };
      setShowMessage(false);
      setLoading(true);
      const data = await actionsService.getTopActions({
        page: props.page,
        size: props.size,
        body: body,
      });
      setData(data.ultimasAcciones);
      setTotal(data.total);
      if (data.total === 0) {
        setShowMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const downloadFiles = (files) => {
    files = files.split(",").reverse();
    const link = document.createElement("a");
    document.body.appendChild(link);

    for (let file of files) {
      link.setAttribute("target", "_blank");
      if (/^\d+-\d{4}$/i.test(file.split(".")[0])) {
        link.href = getRouteOficio(tipo, file);
      } else {
        link.href = getRouteFile(tipo, file);
      }
      link.setAttribute("download", file);
      link.click();
    }
    document.body.removeChild(link);
  };

  const downloadReport = async ({ _d }) => {
    let fechaInicio = "";
    let fechaFin = "";
    let date = new Date(_d);

    if (selectRange === "day") {
      fechaInicio = `${date.toISOString().split("T")[0]}T00:00:00.000Z`;
      fechaFin = `${date.toISOString().split("T")[0]}T23:59:59.999Z`;
    } else if (selectRange === "month") {
      let y = date.getFullYear(),
        m = date.getMonth();
      const firstDay = new Date(y, m, 1);
      const lastDay = new Date(y, m + 1, 0);
      fechaInicio = `${firstDay.toISOString().split("T")[0]}T00:00:00.000Z`;
      fechaFin = `${lastDay.toISOString().split("T")[0]}T23:59:59.999Z`;
    } else {
      let year = date.getFullYear();
      fechaInicio = `${year}-01-01T00:00:00.000Z`;
      fechaFin = `${year}-12-31T00:00:00.000Z`;
    }

    try {
      const body = {
        tipoAlerta: tipo,
        fechaInicio,
        fechaFin,
      };
      const data = await actionsService.getTopActions({
        page: 1,
        size: total,
        body: body,
      });
      createReport({
        data: data.ultimasAcciones,
        inicio: fechaInicio,
        fin: fechaFin,
        formData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    find({ _d: new Date(), props: props });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    find({ _d: selectedDate, props: props });
    // eslint-disable-next-line
  }, [selectRange]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale="es">
          <DatePicker
            views={getDateArray()}
            label="Fecha"
            value={selectedDate}
            maxDate={new Date()}
            onChange={handleDateChange}
            openTo="date"
            inputVariant="outlined"
            format={getDateFormat()}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div style={{ display: "flex" }}>
          <Button
            color="secondary"
            variant={selectRange === "day" ? "contained" : "outlined"}
            style={{ marginLeft: "auto" }}
            onClick={(e) => setSelectRange("day")}
          >
            Día
          </Button>
          <Button
            color="secondary"
            variant={selectRange === "month" ? "contained" : "outlined"}
            className="ma-2"
            onClick={(e) => setSelectRange("month")}
          >
            Mes
          </Button>
          <Button
            color="secondary"
            variant={selectRange === "year" ? "contained" : "outlined"}
            className="ma-2"
            onClick={(e) => setSelectRange("year")}
          >
            Año
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 30 }}>
        {loading && <LinearProgress />}
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>No. Alerta</TableCell>
                {tipo === 1 && <TableCell>No. Caso</TableCell>}
                <TableCell>Acción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Observaciones</TableCell>
                <TableCell className="text-center">Documentos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((log, index) => (
                <TableRow className={classes.root} key={"Log" + index}>
                  <TableCell>
                    {tipo === 2 ? (
                      <Link to={`/SICM/IsabelClaudina/${log.numeroAlerta}`}>
                        {log.numeroAlerta}
                      </Link>
                    ) : (
                      <Link to={`/SICM/AlbaKeneth/${log.numeroAlerta}`}>
                        {log.numeroAlerta}
                      </Link>
                    )}
                  </TableCell>
                  {tipo === 1 && <TableCell>{log.numeroCaso}</TableCell>}
                  <TableCell>
                    {log.codigoAccionNotificacion
                      ? formDataFunctions.getAccionesNotificacion(
                          formData,
                          log.codigoAccionNotificacion
                        )
                      : formDataFunctions.getAcciones(
                          formData,
                          log.codigoAccion
                        )}
                  </TableCell>
                  <TableCell>
                    {formDataFunctions.getEstado(formData, log.estadoAlerta)}
                  </TableCell>
                  <TableCell>{formatDate(log.fechaAccion)}</TableCell>
                  <TableCell>{log.observaciones}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {log.adjunto !== null && log.adjunto !== "" && (
                      <Tooltip title="Descargar Documentos">
                        <IconButton
                          size="small"
                          className="fa fa-download "
                          color="secondary"
                          onClick={(e) => downloadFiles(log.adjunto)}
                        ></IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination size={total} onPageChange={onPageChange} />
        </TableContainer>
        {showMessage && (
          <h5>No hay acciones realizadas en la fecha seleccionada</h5>
        )}
      </Grid>
      <Grid item xs={12}>
        <div style={{ display: "flex" }}>
          <Button
            color="secondary"
            variant="outlined"
            style={{ marginLeft: "auto" }}
            onClick={() => downloadReport({ _d: selectedDate })}
          >
            Descargar Excel
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

export { TopActions };
