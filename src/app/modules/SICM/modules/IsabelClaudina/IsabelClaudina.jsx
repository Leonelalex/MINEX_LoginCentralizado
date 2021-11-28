/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { AlertList, ActivateAlert } from "./";
import { connect } from "react-redux";
import { Switch, Route, useParams, useHistory } from "react-router-dom";
// eslint-disable-next-line
import { makeStyles } from "@material-ui/core/styles";
import {
  formDataAction,
  isabelClaudinaActions,
  alertAction,
} from "../../../../../actions/SICM";
import { getDateFormat } from "../../../../../helpers/SICM";
import { Bitacora } from "./Bitacora.jsx";
import {
  CardBody,
  Card,
} from "../../../../../_metronic/_partials/controls/Card";
import { findService } from "../../../../../services/SICM";
import { alertTypeConstants } from "../../../../../constants/SICM";
import { TopActions } from "../Actions";
import { Select } from "@material-ui/core/";
import { MenuItem } from "@material-ui/core/";
import { Button } from "@material-ui/core/";
import { TextField } from "@material-ui/core/";
import { FormControlLabel } from "@material-ui/core/";
import { Checkbox } from "@material-ui/core/";
import { InputLabel } from "@material-ui/core/";
import { FormControl } from "@material-ui/core/";
import { CardHeader } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "90%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  rootForm: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function isabelClaudina({ dispatch }) {
  // eslint-disable-next-line
  useEffect(() => {
    dispatch(formDataAction.getFormData());
    /*  dispatch(isabelClaudinaActions.getAlerts({ page: 1, size: 10 })); */
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path="/SICM/IsabelClaudina" component={Dashboard} />
      <Route path="/SICM/IsabelClaudina/activar" component={ActivateAlert} />
      <Route path="/SICM/IsabelClaudina/bitacora/:id" component={Bitacora} />
      <Route path="/SICM/IsabelClaudina/bitacora/" component={Bitacora} />
      <Route path="/SICM/IsabelClaudina/:id" component={Dashboard} />
    </Switch>
  );
}

function dashboard({ formData, dispatch }) {
  // eslint-disable-next-line
  const classes = useStyles();
  const currentDate = getDateFormat();
  // eslint-disable-next-line
  const [menu, setMenu] = useState(1);
  // eslint-disable-next-line
  const [filtro, setFiltro] = useState({
    estado: -1,
    fechaActivacionIni: currentDate,
    fechaActivacionFin: currentDate,
    fechaDesactivacionIni: currentDate,
    fechaDesactivacionFin: currentDate,
    activeinitDate: false,
    activeEndDate: false,
    codigoAlerta: "",
    // numeroCaso: "",
    codigoOficio: "",
  });
  // eslint-disable-next-line
  const [body, setBody] = useState({});
  // eslint-disable-next-line
  const { id } = useParams();
  // eslint-disable-next-line
  const history = useHistory();

  const handleChangeState = (id, value) => {
    setFiltro({ ...filtro, [id]: value });
  };

  const handleChange = (event) => {
    setFiltro({ ...filtro, [event.target.id]: event.target.value });
  };

  const handleReset = (e) => {
    setFiltro({
      ...filtro,
      estado: -1,
      fechaActivacionIni: currentDate,
      fechaActivacionFin: currentDate,
      fechaDesactivacionIni: currentDate,
      fechaDesactivacionFin: currentDate,
      codigoAlerta: "",
      // numeroCaso: "",
      codigoOficio: "",
    });
  };

  const getAlerts = () => {
    const body = {
      codigoAlerta: filtro.codigoAlerta,
      // numeroCaso: filtro.numeroCaso,
      codigoOficio: filtro.codigoOficio,
    };
    if (filtro.estado !== -1) {
      body.estado = filtro.estado;
    }
    if (filtro.activeinitDate) {
      body.fechaActivacionIni = filtro.fechaActivacionIni + "T00:00:00.000Z";
      body.fechaActivacionFin = filtro.fechaActivacionFin + "T23:59:59.000Z";
    }
    if (filtro.activeEndDate) {
      body.fechaDesactivacionIni =
        filtro.fechaDesactivacionIni + "T00:00:00.000Z";
      body.fechaDesactivacionFin =
        filtro.fechaDesactivacionFin + "T23:59:59.000Z";
    }
    setBody(body);
    dispatch(isabelClaudinaActions.getAlerts({ page: 1, size: 10, body }));
    history.push(`/SICM/IsabelClaudina`);
  };

  const search = async (alertCode) => {
    try {
      const alert = await findService.getAlert(alertCode);
      if (alert.tipoAlerta !== alertTypeConstants.ISABELCLAUDINA) {
        dispatch(alertAction.error("Alerta no encontrada"));
        return;
      }
      dispatch(isabelClaudinaActions.searchAlert(alert));
    } catch (error) {
      console.error(error);
    }
  };
  // eslint-disable-next-line
  useEffect(() => {
    dispatch(isabelClaudinaActions.getAlerts({ page: 1, size: 10, body }));
    // eslint-disable-next-line
  }, [dispatch]);
  // eslint-disable-next-line
  useEffect(() => {
    if (id !== null && id !== undefined) {
      search(id);
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <Card>
      <CardHeader
        title="Alertas Isabel-Claudina"
        action={
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => setMenu(menu === 1 ? 2 : 1)}
          >
            {menu === 1 ? "Últimas acciones" : "Ver Alertas"}
          </Button>
        }
      />

      {menu === 1 ? (
        <CardBody>
          <FormControlLabel
            control={
              <Checkbox
                checked={filtro.activeinitDate}
                name="checkedB"
                color="primary"
                onChange={(e) => {
                  handleChangeState("activeinitDate", e.target.checked);
                }}
              />
            }
            label="Filtrar por fecha de activación"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filtro.activeEndDate}
                name="checkedB"
                color="primary"
                onChange={(e) => {
                  handleChangeState("activeEndDate", e.target.checked);
                }}
              />
            }
            label="Filtrar por fecha de desactivación"
          />

          <div className="row mb-4">
            <div className={"col-12 " + classes.rootForm}>
              <FormControl style={{ width: "20ch" }}>
                <InputLabel id="estado">Estado</InputLabel>
                <Select
                  labelId="estado"
                  id="estado"
                  value={filtro.estado}
                  onChange={(e) => handleChangeState("estado", e.target.value)}
                >
                  <MenuItem value={-1}>Todas</MenuItem>
                  {formData.estadosAlerta &&
                    formData.estadosAlerta.map((estado) => (
                      <MenuItem
                        value={estado.codigoEstado}
                        key={estado.codigoEstado}
                      >
                        {estado.nombre}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <TextField
                id="codigoAlerta"
                label="No. de Alerta"
                value={filtro.codigoAlerta}
                onChange={handleChange}
                style={{ width: "20ch" }}
              />
              {/* <TextField
                id="numeroCaso"
                label="No. de Caso"
                value={filtro.numeroCaso}
                onChange={handleChange}
                style={{ width: "20ch" }}
              /> */}
              <TextField
                id="codigoOficio"
                label="No. de Oficio"
                value={filtro.codigoOficio}
                onChange={handleChange}
                style={{ width: "20ch" }}
              />
              {filtro.activeinitDate && (
                <React.Fragment>
                  <FormControl>
                    <TextField
                      label="Inicio Fecha Activación"
                      className={classes.textField}
                      value={filtro.fechaActivacionIni}
                      onChange={(e) =>
                        handleChangeState("fechaActivacionIni", e.target.value)
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="date"
                      InputProps={{
                        inputProps: { max: getDateFormat() },
                      }}
                    ></TextField>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Fin Fecha Activación"
                      className={classes.textField}
                      value={filtro.fechaActivacionFin}
                      onChange={(e) =>
                        handleChangeState("fechaActivacionFin", e.target.value)
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="date"
                      InputProps={{
                        inputProps: { max: getDateFormat() },
                      }}
                    ></TextField>
                  </FormControl>
                </React.Fragment>
              )}
              {filtro.activeEndDate && (
                <React.Fragment>
                  <FormControl>
                    <TextField
                      label="Inicio Fecha Desactivación"
                      className={classes.textField}
                      value={filtro.fechaDesactivacionIni}
                      onChange={(e) =>
                        handleChangeState(
                          "fechaDesactivacionIni",
                          e.target.value
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="date"
                      InputProps={{
                        inputProps: { max: getDateFormat() },
                      }}
                    ></TextField>
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Fin Fecha Desativación"
                      className={classes.textField}
                      value={filtro.fechaDesactivacionFin}
                      onChange={(e) =>
                        handleChangeState(
                          "fechaDesactivacionFin",
                          e.target.value
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      type="date"
                      InputProps={{
                        inputProps: { max: getDateFormat() },
                      }}
                    ></TextField>
                  </FormControl>
                </React.Fragment>
              )}

              <Button
                style={{ width: "16ch" }}
                variant="contained"
                color="secondary"
                onClick={getAlerts}
              >
                Buscar
              </Button>

              <Button
                style={{ width: "14ch", margin: "1rem" }}
                variant="contained"
                type="reset"
                className={classes.primary}
                onClick={handleReset}
              >
                Limpiar
              </Button>
            </div>
          </div>

          <AlertList />
        </CardBody>
      ) : (
        <CardBody>
          <TopActions tipo={2} formData={formData} />
        </CardBody>
      )}
    </Card>
  );
}

const mapStateProps = function(state) {
  return {
    formData: state.formData,
    isabelClaudina: state.isabelClaudina,
  };
};

const IsabelClaudina = connect(mapStateProps)(isabelClaudina);
const Dashboard = connect(mapStateProps)(dashboard);
export { IsabelClaudina };
